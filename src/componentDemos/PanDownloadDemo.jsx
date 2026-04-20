import { useState, useContext, useMemo } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  Divider,
  Paper,
  Chip,
  createTheme,
  DialogContent,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { PanDownload, PanDialog } from "../rcl";
import netContext from "../rcl/contexts/netContext";
import debugContext from "../rcl/contexts/debugContext";
import PropsPanel from "./PropsPanel";
import { postEmptyJson } from "pithekos-lib";
import { doI18n } from "pithekos-lib"; // assuming doI18n is exported here
import I18nContext from "../rcl/contexts/i18nContext";
import { CorporateFare, Login } from "@mui/icons-material";

export default function PanDownloadDemo() {
  const [mode, setMode] = useState("list"); // "list" | "whitelist"
  const { enabledRef } = useContext(netContext);
  const isOnline = enabledRef?.current ?? false;
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(I18nContext);
  const [openDialoguePanDownload, setOpenDialoguePanDownload] = useState(false);

  const theme = createTheme({
    palette: {
      primary: { main: "#C49464" },
      secondary: { main: "#00473E" },
    },
  });

  /** Structured list mode */
  const demoList = {
    "qa.door43.org": {
      unfoldingWord: ["en_ust", "el-x-koine_ugnt", "en_ta"],
      "translationCore-Create-BCS": ["or_gst"],
    },
  };

  const preSelectedList = [];
  /** Whitelist-only mode */
  const sourceWhitelistOrgs = useMemo(
    () => [
      ["git.door43.org/BurritoTruck", "Xenizo curated content (Door43)", <CorporateFare />],
      ["git.door43.org/uW", "unfoldingWord curated content (Door43)", <Login />],
      ["git.door43.org/shower", "Aquifer exported content (Door43)"],
    ],
    [],
  );

  const defaultFilterProps = useMemo(() => {
    if (mode === "whitelist" && sourceWhitelistOrgs.length > 0) {
      const firstOrg = sourceWhitelistOrgs[0][0];
      return (row) => row.source.startsWith(firstOrg);
    }
    return null;
  }, [mode, sourceWhitelistOrgs]);

  const toggleMode = () => {
    setMode((prev) => (prev === "list" ? "whitelist" : "list"));
  };

  /** Build props for PanDownload */
  const panDownloadProps = useMemo(
    () => ({
      sources: mode === "list" ? demoList : sourceWhitelistOrgs,
      tableTitle:
        mode === "list"
          ? doI18n("pages:core-client-rcl:list_mode", i18nRef.current)
          : doI18n("pages:core-client-rcl:whitelist_mode", i18nRef.current),
      defaultFilterProps,
      downloadFunction: DownloadBurrito,
      downloadLegacyFunction: DownloadLegacy,
      showColumnFilters: true,
      preSelected: preSelectedList,
      downloadedType: "org",
      showFilterButtons: mode !== "list",
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [mode, defaultFilterProps]
  );
  let legacyTitle = doI18n(
    "pages:core-client-rcl:legacy_download",
    i18nRef.current,
  );
  const panDownloadPropsLegacy = useMemo(
    () => ({
      sources: [["git.door43.org/quentinroca", "Quentin Roca content"]],
      tableTitle: legacyTitle,
      defaultFilterProps,
      showColumnFilters: true,
      downloadedType: "user",
      downloadFunction: DownloadBurrito,
      downloadLegacyFunction: DownloadLegacy,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [mode, defaultFilterProps, legacyTitle],
  );

  async function DownloadLegacy(params, remoteRepoPath, postType) {
    let fetchResponse;
    const downloadResponse = await fetch(params.row.url);

    if (!downloadResponse.ok) {
      throw new Error(
        doI18n("pages:core-client-rcl:failed_download", i18nRef.current),
      );
    }

    const zipBlob = await downloadResponse.blob();
    const formData = new FormData();
    formData.append("file", zipBlob);

    fetchResponse = await fetch("/temp/bytes", {
      method: "POST",
      body: formData,
    });

    if (!fetchResponse.ok) {
      throw new Error(
        doI18n("pages:core-client-rcl:upload_failed", i18nRef.current),
      );
    }

    const data = await fetchResponse.json();
    enqueueSnackbar(
      `${doI18n("pages:core-client-rcl:document_downloaded", i18nRef.current)} ${data.uuid}`,
      { variant: "success" },
    );
    return fetchResponse;
  }

  async function DownloadBurrito(params, remoteRepoPath, postType) {
    let fetchUrl =
      postType === "clone"
        ? `/git/clone-repo/${remoteRepoPath}`
        : `/git/pull-repo/origin/${remoteRepoPath}`;

    if (
      params.row.topics.some((topic) =>
        ["pushing2sb", "tc-ready"].includes(topic),
      )
    ) {
      if (postType === "clone") fetchUrl += "?branch=main";
    }

    let response = await postEmptyJson(fetchUrl, debugRef.current);

    return response;
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 2,
        flex: 1,
      }}
    >
      {/* ───────────── Left Panel ───────────── */}
      <Paper elevation={2} sx={{ p: 2, overflow: "auto" }}>
        <Typography variant="h6" gutterBottom>
          {doI18n("pages:core-client-rcl:props_title", i18nRef.current)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2">
              {doI18n("pages:core-client-rcl:network_status", i18nRef.current)}
            </Typography>
            <Chip
              label={
                isOnline
                  ? doI18n("pages:core-client-rcl:online", i18nRef.current)
                  : doI18n("pages:core-client-rcl:offline", i18nRef.current)
              }
              color={isOnline ? "success" : "warning"}
              size="small"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2">
              {doI18n("pages:core-client-rcl:mode", i18nRef.current)}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={mode} color="primary" size="small" />
              <Button
                size="small"
                variant="outlined"
                onClick={toggleMode}
                disabled={!isOnline}
              >
                {doI18n("pages:core-client-rcl:switch_mode", i18nRef.current)}
              </Button>
            </Stack>
          </Box>

          <PropsPanel
            args={{
              sources: mode === "list" ? demoList : sourceWhitelistOrgs,
              tableTitle:
                mode === "list"
                  ? doI18n("pages:core-client-rcl:list_mode", i18nRef.current)
                  : doI18n(
                      "pages:core-client-rcl:whitelist_mode",
                      i18nRef.current,
                    ),
              defaultFilterProps,
              showColumnFilters: true,
              showFilterButtons: mode !== "list"
            }}
          />

          {!isOnline && (
            <Alert severity="warning">
              {doI18n(
                "pages:core-client-rcl:internet_required",
                i18nRef.current,
              )}
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* ───────────── Right Panel Preview ───────────── */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {doI18n("pages:core-client-rcl:live_preview", i18nRef.current)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {isOnline ? (
          <PanDownload theme={theme} {...panDownloadProps} />
        ) : (
          <Alert severity="info">
            {doI18n("pages:core-client-rcl:connect_internet", i18nRef.current)}
          </Alert>
        )}
      </Paper>

      {/* ───────────── Legacy Panel ───────────── */}
      <Paper elevation={2} sx={{ p: 2, overflow: "auto" }}>
        <Typography variant="h6" gutterBottom>
          {doI18n("pages:core-client-rcl:props_title", i18nRef.current)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2">
              {doI18n("pages:core-client-rcl:network_status", i18nRef.current)}
            </Typography>
            <Chip
              label={
                isOnline
                  ? doI18n("pages:core-client-rcl:online", i18nRef.current)
                  : doI18n("pages:core-client-rcl:offline", i18nRef.current)
              }
              color={isOnline ? "success" : "warning"}
              size="small"
            />
          </Box>

          <PropsPanel args={{}} />

          {!isOnline && (
            <Alert severity="warning">
              {doI18n(
                "pages:core-client-rcl:internet_required",
                i18nRef.current,
              )}
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* ───────────── Legacy Preview ───────────── */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {doI18n("pages:core-client-rcl:live_preview", i18nRef.current)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {isOnline ? (
          <PanDownload theme={theme} {...panDownloadPropsLegacy} />
        ) : (
          <Alert severity="info">
            {doI18n("pages:core-client-rcl:connect_internet", i18nRef.current)}
          </Alert>
        )}
      </Paper>

      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <Button onClick={() => setOpenDialoguePanDownload(true)}>
          {doI18n(
            "pages:core-client-rcl:pan_download_in_dialogue",
            i18nRef.current,
          )}
        </Button>
        <PanDialog
          isOpen={openDialoguePanDownload}
          closeFn={() => setOpenDialoguePanDownload(false)}
        >
          <DialogContent sx={{ overflow: "hidden" }}>
            <Box sx={{ height: "calc(100vh - 229px)" }}>
              <PanDownload theme={theme} {...panDownloadProps} />
            </Box>
          </DialogContent>
        </PanDialog>
      </Box>
    </Box>
  );
}
