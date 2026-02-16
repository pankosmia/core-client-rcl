import PanTable from "./PanTable";
import { CircularProgress, Box, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import CloudDownload from "@mui/icons-material/CloudDownload";
import CloudDone from "@mui/icons-material/CloudDone";
import Update from "@mui/icons-material/Update";
import { enqueueSnackbar } from "notistack";
import { Stack, Chip, Grid2 } from "@mui/material";
import { getAndSetJson, getJson, doI18n, postEmptyJson } from "pithekos-lib";
import i18nContext from "./contexts/i18nContext";
import debugContext from "./contexts/debugContext";
import { useState, useEffect, useContext, useCallback } from "react";
const fetchMetaDataSummaries = async (setMetadataSummaries, debugRef) => {
  const summaries = await getJson(
    "/burrito/metadata/summaries",
    debugRef.current,
  );
  setMetadataSummaries(summaries.json);
};

export default function PanDownload({
  downloadedType = "burrito",
  downloadFunction,
  sources,
  showColumnFilters,
  tableTitle,
  sx,
  theme,
}) {
  const { i18nRef } = useContext(i18nContext);
  const { debugRef } = useContext(debugContext);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [catalog, setCatalog] = useState([]);
  const [isDownloading, setIsDownloading] = useState(null);
  const [metadataSummaries, setMetadataSummaries] = useState({});

  const { sourceWhitelist, filterExample, listMode } = useMemo(() => {
    // Case 1: whitelist array
    if (Array.isArray(sources)) {
      return {
        listMode: false,
        sourceWhitelist: sources,
        filterExample: sources.map(([path, label]) => ({
          label,
          filter:
            downloadedType === "burrito"
              ? (row) => row?.source?.startsWith(path) ?? false
              : (row) => row?.metadata_types === "rc" ?? false,
        })),
      };
    }

    // Case 2: structured list object
    if (sources && typeof sources === "object") {
      const whitelist = [];

      for (const [org, projects] of Object.entries(sources)) {
        for (const projectKey of Object.keys(projects)) {
          whitelist.push([`${org}/${projectKey}`, projectKey]);
        }
      }

      return {
        listMode: true,
        sourceWhitelist: whitelist,
        filterExample: [],
      };
    }

    // Fallback
    return {
      listMode: false,
      sourceWhitelist: [],
      filterExample: [],
    };
  }, [sources]);

  useEffect(() => {
    if (filterExample.length > 0 && activeFilterIndex === null) {
      setActiveFilterIndex(0);
    }
  }, [filterExample, activeFilterIndex]);

  const activeFilter = useMemo(() => {
    return activeFilterIndex !== null
      ? filterExample[activeFilterIndex]?.filter
      : null;
  }, [activeFilterIndex, filterExample]);

  useEffect(() => {
    setCatalog([]);
    setIsDownloading(null);
    fetchMetaDataSummaries(setMetadataSummaries, debugRef);
  }, [sourceWhitelist, activeFilterIndex]);

  useEffect(() => {
    const doCatalog = async () => {
      let newCatalog = [];
      let source = sourceWhitelist[activeFilterIndex];
      let chemin = source[0].split("/");
      let response;
      if (downloadedType === "burrito") {
        response = await getJson(
          `/gitea/remote-repos/${source[0]}`,
          debugRef.current,
        );
      }
      if (downloadedType === "legacy") {
        response = await getJson(
          `/gitea/user-remote-repos/${source[0]}`,
          debugRef.current,
        );
      }
      if (response.ok) {
        if (listMode) {
          const newResponse = response.json
            .filter((r) => sources[chemin[0]][chemin[1]].includes(r.name))
            .map((r) => ({ ...r, source: source[0] }));
          newCatalog = [...newCatalog, ...newResponse];
        } else {
          const newResponse = response.json.map((r) => {
            return { ...r, source: source[0] };
          });
          newCatalog = [...newCatalog, ...newResponse];
        }
      }
      setCatalog(newCatalog);
    };
    doCatalog().then();
  }, [sourceWhitelist, activeFilterIndex]);

  useEffect(() => {
    if (!isDownloading && catalog.length > 0) {
      const downloadStatus = async () => {
        const newIsDownloading = {};
        console.log(catalog);
        console.log(metadataSummaries)
        for (const e of catalog) {
          console.log(e)
          if (metadataSummaries[`${e.source}/${e.name}`]) {
            const metadataResponse = metadataSummaries[`${e.source}/${e.name}`];
            const metadataTime = metadataResponse.timestamp;
            const remoteUpdateTime = Date.parse(e.updated_at) / 1000;
            newIsDownloading[`${e.source}/${e.name}`] =
              remoteUpdateTime - metadataTime > 0 ? "updatable" : "downloaded";
          } else {
            newIsDownloading[`${e.source}/${e.name}`] = "notDownloaded";
          }
        }
        setIsDownloading(newIsDownloading);
      };
      downloadStatus().then();
    }
  }, [isDownloading, catalog,metadataSummaries]);

  const handleDownloadClick = useCallback(
    async (params, remoteRepoPath, postType) => {
      setIsDownloading((isDownloadingCurrent) => ({
        ...isDownloadingCurrent,
        [remoteRepoPath]: "downloading",
      }));
      enqueueSnackbar(
        `${doI18n(
          "pages:core-remote-resources:downloading",
          i18nRef.current,
        )} ${params.row.abbreviation}`,
        { variant: "info" },
      );
      let fetchResponse = await downloadFunction(
        params,
        remoteRepoPath,
        postType,
      );

      if (fetchResponse.ok) {
        enqueueSnackbar(
          `${params.row.abbreviation} ${doI18n(
            postType === "clone"
              ? "pages:core-remote-resources:downloaded"
              : "pages:core-remote-resources:updated",
            i18nRef.current,
          )}`,
          { variant: "success" },
        );
        setIsDownloading((isDownloadingCurrent) => ({
          ...isDownloadingCurrent,
          [remoteRepoPath]: "downloaded",
        }));
      } else {
        enqueueSnackbar(
          `${params.row.abbreviation} ${doI18n(
            "pages:core-remote-resources:failed",
            i18nRef.current,
          )} : ${fetchResponse.error} (${fetchResponse.status})`,
          { variant: "error" },
        );
        setIsDownloading((isDownloadingCurrent) => ({
          ...isDownloadingCurrent,
          [remoteRepoPath]: "notDownloaded",
        }));
      }
    },
    [],
  );

  // Columns for the Data Grid
  const columns = useMemo(
    () => [
      {
        field: "resourceCode",
        headerName: doI18n(
          "library:panksomia-rcl:row_resource_code",
          i18nRef.current,
        ),
        flex: 0.5,
        minWidth: 140,
      },
      {
        field: "language",
        headerName: doI18n(
          "library:panksomia-rcl:row_language",
          i18nRef.current,
        ),
        flex: 0.5,
        minWidth: 120,
      },
      {
        field: "description",
        headerName: doI18n(
          "library:panksomia-rcl:row_description",
          i18nRef.current,
        ),
        flex: 2,
        minWidth: 130,
      },
      {
        field: "type",
        headerName: doI18n("library:panksomia-rcl:row_type", i18nRef.current),
        flex: 1.5,
        minWidth: 80,
      },
      {
        field: "download",
        sortable: false,
        headerName: doI18n(
          "library:panksomia-rcl:row_download",
          i18nRef.current,
        ),
        flex: 0.5,
        minWidth: 120,
        renderCell: (params) => {
          const remoteRepoPath = `${params.row.source}/${params.row.name}`;
          if (!isDownloading) return <CloudDownload disabled />;
          if (isDownloading[remoteRepoPath] === "notDownloaded")
            return (
              <CloudDownload
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadClick(params, remoteRepoPath, "clone");
                }}
              />
            );
          if (isDownloading[remoteRepoPath] === "updatable")
            return (
              <Update
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadClick(params, remoteRepoPath, "fetch");
                }}
              />
            );
          if (isDownloading[remoteRepoPath] === "downloading")
            return <CircularProgress size="30px" color="secondary" />;
          return <CloudDone color="disabled" />;
        },
      },
    ],
    [i18nRef, isDownloading, handleDownloadClick],
  );
  // Rows for the Data Grid
  const rows = useMemo(
    () =>
      catalog
        .filter((ce) => ce.flavor)
        .map((ce) => ({
          ...ce,
          id: `${ce.source}/${ce.name}`, // ✅ stable
          url: ce.latest_zip,
          metadata_types: ce.metadata_types,
          resourceCode: ce.abbreviation.toUpperCase(),
          language: ce.language_code,
          description: ce.description,
          type: doI18n(
            `flavors:names:${ce.flavor_type}/${ce.flavor}`,
            i18nRef.current,
          ),
        })),
    [catalog, i18nRef],
  );

  const operationsDefinitionsExample = [
    {
      label: "Download selected",
      icon: CloudDownload,
      action: (context, allDataRows) => {
        if (!isDownloading) return; // prevent click before state ready
        let selectedRowsData = allDataRows.filter((row) =>
          context.selectedIds.includes(row.id),
        );
        selectedRowsData.forEach((e) => {
          const remoteRepoPath = `${e.source}/${e.name}`;
          if (isDownloading[remoteRepoPath] === "notDownloaded") {
            handleDownloadClick({ row: e }, remoteRepoPath, "clone");
          } else if (isDownloading[remoteRepoPath] === "updatable") {
            handleDownloadClick({ row: e }, remoteRepoPath, "fetch");
          }
        });
      },
    },
  ];
  const Wrapper = theme ? ThemeProvider : React.Fragment;
  const wrapperProps = theme ? { theme } : {};
  return (
    <Wrapper {...wrapperProps}>
      {/* ───────────── Filter Buttons ───────────── */}
      {filterExample?.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 1, flexWrap: "wrap" }}
        >
          {filterExample.map((f, index) => {
            const isActive = activeFilterIndex === index;

            return (
              <Chip
                key={f.label}
                label={f.label}
                color={isActive ? "secondary" : "default"}
                variant={isActive ? "filled" : "outlined"}
                onClick={() => setActiveFilterIndex(index)}
              />
            );
          })}
        </Stack>
      )}
      {rows && rows.length > 0 ? (
        <PanTable
          columns={columns}
          rows={rows}
          tableTitle={tableTitle}
          groupOperations={listMode ? operationsDefinitionsExample : null}
          defaultFilter={activeFilter}
          showColumnFilters={showColumnFilters}
          sx={{ ...sx, height: "100%" }}
        />
      ) : (
        // Centered loading spinner
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // take full available height
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Wrapper>
  );
}
