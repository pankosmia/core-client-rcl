import PanTable from "./PanTable";
import { CircularProgress,Box } from "@mui/material";
import { useMemo } from "react";
import CloudDownload from "@mui/icons-material/CloudDownload";
import CloudDone from "@mui/icons-material/CloudDone";
import Update from "@mui/icons-material/Update";
import { enqueueSnackbar } from "notistack";
import { Stack, Chip } from "@mui/material";
import {
  getAndSetJson,
  getJson,
  i18nContext,
  doI18n,
  debugContext,
  postEmptyJson,
} from "pithekos-lib";
import { useState, useEffect, useContext, useCallback } from "react";
export default function PanDownload({
  sources,
  showColumnFilters,
  tableTitle,
  sx,
}) {
  const { i18nRef } = useContext(i18nContext);
  const { debugRef } = useContext(debugContext);
  console.log(sources);

  const { sourceWhitelist, filterExample, listMode } = useMemo(() => {
    // Case 1: whitelist array
    if (Array.isArray(sources)) {
      return {
        listMode: false,
        sourceWhitelist: sources,
        filterExample: sources.map(([path, label]) => ({
          label,
          filter: (row) => row?.source?.startsWith(path) ?? false,
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
  console.log(sourceWhitelist);
  const [activeFilterIndex, setActiveFilterIndex] = useState(null);
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
  console.log(filterExample);
  const [catalog, setCatalog] = useState([]);
  const [localRepos, setLocalRepos] = useState([]);
  const [isDownloading, setIsDownloading] = useState(null);
  useEffect(() => {
    setCatalog([]);
    setIsDownloading(null);
  }, [sourceWhitelist]);

  useEffect(() => {
    const doCatalog = async () => {
      if (catalog.length === 0) {
        let newCatalog = [];
        for (let source of sourceWhitelist) {
          let chemin = source[0].split("/");
          const response = await getJson(
            `/gitea/remote-repos/${source[0]}`,
            debugRef.current,
          );
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
        }
        setCatalog(newCatalog);
      }
    };
    doCatalog().then();
  }, [catalog]);

  useEffect(() => {
    getAndSetJson({
      url: "/git/list-local-repos",
      setter: setLocalRepos,
    }).then();
  }, []);

  useEffect(() => {
    if (!isDownloading && catalog.length > 0 && localRepos) {
      const downloadStatus = async () => {
        const newIsDownloading = {};
        for (const e of catalog) {
          if (localRepos.includes(`${e.source}/${e.name}`)) {
            const metadataUrl = `/burrito/metadata/summary/${e.source}/${e.name}`;
            let metadataResponse = await getJson(metadataUrl, debugRef.current);
            if (metadataResponse.ok) {
              const metadataTime = metadataResponse.json.timestamp;
              const remoteUpdateTime = Date.parse(e.updated_at) / 1000;
              newIsDownloading[`${e.source}/${e.name}`] =
                remoteUpdateTime - metadataTime > 0
                  ? "updatable"
                  : "downloaded";
            } else {
              newIsDownloading[`${e.source}/${e.name}`] = "downloaded";
            }
          } else {
            newIsDownloading[`${e.source}/${e.name}`] = "notDownloaded";
          }
        }
        setIsDownloading(newIsDownloading);
      };
      downloadStatus().then();
    }
  }, [isDownloading, catalog, localRepos]);

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
      const fetchUrl =
        postType === "clone"
          ? `/git/clone-repo/${remoteRepoPath}`
          : `/git/pull-repo/origin/${remoteRepoPath}`;
      const fetchResponse = await postEmptyJson(fetchUrl, debugRef.current);
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
  const columns = [
    {
      field: "resourceCode",
      headerName: doI18n(
        "pages:core-remote-resources:row_resource_code",
        i18nRef.current,
      ),
      flex: 0.5,
      minWidth: 140,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "language",
      headerName: doI18n(
        "pages:core-remote-resources:row_language",
        i18nRef.current,
      ),
      flex: 0.5,
      minWidth: 120,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: doI18n(
        "pages:core-remote-resources:row_description",
        i18nRef.current,
      ),
      flex: 2,
      minWidth: 130,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      headerName: doI18n(
        "pages:core-remote-resources:row_type",
        i18nRef.current,
      ),
      flex: 1.5,
      minWidth: 80,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "download",
      sortable: false,
      headerName: doI18n(
        "pages:core-remote-resources:row_download",
        i18nRef.current,
      ),
      flex: 0.5,
      minWidth: 120,
      headerAlign: "left",
      align: "left",

      renderCell: (params) => {
        const remoteRepoPath = `${params.row.source}/${params.row.name}`;
        if (!isDownloading) {
          return <CloudDownload disabled />;
        }
        if (isDownloading[remoteRepoPath] === "notDownloaded") {
          return (
            <CloudDownload
              onClick={(event) => {
                event.stopPropagation();
                handleDownloadClick(params, remoteRepoPath, "clone");
              }}
            />
          );
        }
        if (isDownloading[remoteRepoPath] === "updatable") {
          return (
            <Update
              onClick={(event) => {
                event.stopPropagation();
                handleDownloadClick(params, remoteRepoPath, "fetch");
              }}
            />
          );
        }
        if (isDownloading[remoteRepoPath] === "downloading") {
          return <CircularProgress size="30px" color="secondary" />;
        }
        return <CloudDone color="disabled" />;
      },
    },
  ];

  // Rows for the Data Grid
  const rows = catalog
    .filter((ce) => ce.flavor)
    .map((ce, n) => {
      return {
        ...ce,
        id: n,
        resourceCode: ce.abbreviation.toUpperCase(),
        language: ce.language_code,
        description: ce.description,
        type: doI18n(
          `flavors:names:${ce.flavor_type}/${ce.flavor}`,
          i18nRef.current,
        ),
      };
    });

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
return (
  <>
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
  </>
);
}