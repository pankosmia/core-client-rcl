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
import { i18nContext } from "../rcl";
export default function PanDownloadDemo() {
  const [mode, setMode] = useState("list"); // "list" | "whitelist"
  const { enabledRef } = useContext(netContext);
  const isOnline = enabledRef?.current ?? false;
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(i18nContext);
  const [openDialoguePanDownload, setOpenDialoguePanDownload] = useState(false);

  const theme = createTheme({
    palette: {
      primary: { main: "#C49464" },
      secondary: { main: "#00473E" },
    },
  });

  /** Structured list mode */
  const demoList = {
    "git.door43.org": {
      uW: [
        "en_tn",
        "en_tw",
        "en_ugl",
        "grc_ugnt",
        "hbo_uhb",
        "en_ust",
        "en_ult",
        "en_ta",
        "en_uhl",
      ],
    },
  };

  /** Whitelist-only mode */
  const sourceWhitelistOrgs = [
    ["git.door43.org/BurritoTruck", "Xenizo curated content (Door43)"],
    ["git.door43.org/uW", "unfoldingWord curated content (Door43)"],
    ["git.door43.org/shower", "Aquifer exported content (Door43)"],
  ];

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
      downloadFunction: DowloadBurrito,
      showColumnFilters: true,
      sx: { flex: 1 },
    }),
    [mode, defaultFilterProps]
  );

  const panDownloadPropsLegacy = useMemo(
    () => ({
      sources: [["git.door43.org/quentinroca", "Quentin Roca content"]],
      tableTitle: doI18n("pages:core-client-rcl:legacy_download", i18nRef.current),
      defaultFilterProps,
      showColumnFilters: true,
      downloadedType: "legacy",
      downloadFunction: DowloadLegacy,
      sx: { flex: 1 },
    }),
    [mode, defaultFilterProps]
  );

  async function DowloadLegacy(params, remoteRepoPath, postType) {
    let fetchResponse;
    const downloadResponse = await fetch(params.row.url);

    if (!downloadResponse.ok) {
      throw new Error(doI18n("pages:core-client-rcl:failed_download", i18nRef.current));
    }

    const zipBlob = await downloadResponse.blob();
    const formData = new FormData();
    formData.append("file", zipBlob);

    fetchResponse = await fetch("/temp/bytes", { method: "POST", body: formData });

    if (!fetchResponse.ok) {
      throw new Error(doI18n("pages:core-client-rcl:upload_failed", i18nRef.current));
    }

    const data = await fetchResponse.json();
    enqueueSnackbar(
      `${doI18n("pages:core-client-rcl:document_downloaded", i18nRef.current)} ${data.uuid}`,
      { variant: "success" }
    );
    return fetchResponse;
  }

  async function DowloadBurrito(params, remoteRepoPath, postType) {
    const fetchUrl =
      postType === "clone"
        ? `/git/clone-repo/${remoteRepoPath}`
        : `/git/pull-repo/origin/${remoteRepoPath}`;

    return await postEmptyJson(fetchUrl, debugRef.current);
  }

  return (
    <Box sx={{ p: 2, display: "grid", gridTemplateColumns: "320px 1fr", gap: 2, flex: 1 }}>
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
              label={isOnline ? doI18n("pages:core-client-rcl:online", i18nRef.current) : doI18n("pages:core-client-rcl:offline", i18nRef.current)}
              color={isOnline ? "success" : "warning"}
              size="small"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2">{doI18n("pages:core-client-rcl:mode", i18nRef.current)}</Typography>
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
              tableTitle: mode === "list"
                ? doI18n("pages:core-client-rcl:list_mode", i18nRef.current)
                : doI18n("pages:core-client-rcl:whitelist_mode", i18nRef.current),
              defaultFilterProps,
              showColumnFilters: true,
            }}
          />

          {!isOnline && (
            <Alert severity="warning">
              {doI18n("pages:core-client-rcl:internet_required", i18nRef.current)}
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* ───────────── Right Panel Preview ───────────── */}
      <Paper elevation={2} sx={{ p: 2, overflow: "hidden", display: "flex", flexDirection: "column" }}>
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
              label={isOnline ? doI18n("pages:core-client-rcl:online", i18nRef.current) : doI18n("pages:core-client-rcl:offline", i18nRef.current)}
              color={isOnline ? "success" : "warning"}
              size="small"
            />
          </Box>

          <PropsPanel args={{}} />

          {!isOnline && (
            <Alert severity="warning">
              {doI18n("pages:core-client-rcl:internet_required", i18nRef.current)}
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* ───────────── Legacy Preview ───────────── */}
      <Paper elevation={2} sx={{ p: 2, overflow: "hidden", display: "flex", flexDirection: "column" }}>
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
          {doI18n("pages:core-client-rcl:pan_download_in_dialogue", i18nRef.current)}
        </Button>
        <PanDialog isOpen={openDialoguePanDownload} closeFn={() => setOpenDialoguePanDownload(false)}>
          <DialogContent>
            <PanDownload theme={theme} {...panDownloadProps} />
          </DialogContent>
        </PanDialog>
      </Box>
    </Box>
  );
}
