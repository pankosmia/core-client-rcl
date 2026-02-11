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
import { PanDownload, PanDialog } from "../rcl";
import netContext from "../rcl/contexts/netContext";
import debugContext from "../rcl/contexts/debugContext";
import PropsPanel from "./PropsPanel";
import { postEmptyJson } from "pithekos-lib";
export default function PanDownloadDemo() {
  const [mode, setMode] = useState("list"); // "list" | "whitelist"
  const { enabledRef } = useContext(netContext);
  const isOnline = enabledRef?.current ?? false;
  const { debugRef } = useContext(debugContext);

  const [openDialoguePanDownload, setOpenDialoguePanDownload] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#C49464",
      },
      secondary: {
        main: "#00473E",
      },
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
    // In whitelist mode, filter by the first org
    if (mode === "whitelist" && sourceWhitelistOrgs.length > 0) {
      const firstOrg = sourceWhitelistOrgs[0][0]; // "git.door43.org/BurritoTruck"
      return (row) => row.source.startsWith(firstOrg);
    }
    // In list mode, no default filter
    return null;
  }, [mode, sourceWhitelistOrgs]);

  const toggleMode = () => {
    setMode((prev) => (prev === "list" ? "whitelist" : "list"));
  };

  /** Build the real props object passed to PanDownload */
  const panDownloadProps = useMemo(
    () => ({
      sources: mode === "list" ? demoList : sourceWhitelistOrgs,
      tableTitle:
        mode === "list"
          ? "Remote Resources (List Mode)"
          : "Remote Resources (Whitelist Mode)",
      defaultFilterProps,
      downloadFunction: DowloadBurrito,
      showColumnFilters: true,
      sx: { flex: 1 },
    }),
    [mode, defaultFilterProps],
  );

  const panDownloadPropsLegacy = useMemo(
    () => ({
      sources: [["git.door43.org/quentinroca", "Quentin Roca content"]],
      tableTitle: "Legacy Download",
      defaultFilterProps,
      showColumnFilters: true,
      downloadedType: "legacy",
      downloadFunction: DowloadLegacy,
      sx: { flex: 1 },
    }),
    [mode, defaultFilterProps],
  );
  async function DowloadLegacy(params, remoteRepoPath, postType) {
    console.log(params, remoteRepoPath, postType);
    let fetchResponse;
    // 1. Download the zip
    const downloadResponse = await fetch(params.row.url);

    if (!downloadResponse.ok) {
      throw new Error("Failed to download zip");
    }

    const zipBlob = await downloadResponse.blob();
    const formData = new FormData();
    formData.append("file", zipBlob);

    fetchResponse = await fetch("/temp/bytes", {
      method: "POST",
      body: formData,
    });
    console.log(fetchResponse);
    if (!fetchResponse.ok) {
      throw new Error("Upload failed");
    }

    const data = await fetchResponse.json();
    console.log(data.uuid);
    window.location.href = `/clients/core-contenthandler_text_translation#/createDocument/textTranslation?uuid=${data.uuid}`;
    return fetchResponse;
  }

  async function DowloadBurrito(params, remoteRepoPath, postType) {
    let fetchResponse;

    const fetchUrl =
      postType === "clone"
        ? `/git/clone-repo/${remoteRepoPath}`
        : `/git/pull-repo/origin/${remoteRepoPath}`;

    fetchResponse = await postEmptyJson(fetchUrl, debugRef.current);
    return fetchResponse;
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
      {/* ───────────── Left: Interactive Args Panel ───────────── */}
      <Paper elevation={2} sx={{ p: 2, overflow: "auto" }}>
        <Typography variant="h6" gutterBottom>
          PanDownload Props
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {/* Network Status */}
          <Box>
            <Typography variant="subtitle2">Network status</Typography>
            <Chip
              label={isOnline ? "Online" : "Offline"}
              color={isOnline ? "success" : "warning"}
              size="small"
            />
          </Box>

          {/* Mode */}
          <Box>
            <Typography variant="subtitle2">Mode</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={mode} color="primary" size="small" />
              <Button
                size="small"
                variant="outlined"
                onClick={toggleMode}
                disabled={!isOnline}
              >
                Switch mode
              </Button>
            </Stack>
          </Box>

          {/* Props Panel */}
          <PropsPanel
            args={{
              sources: mode === "list" ? demoList : sourceWhitelistOrgs,

              tableTitle:
                mode === "list"
                  ? "Remote Resources (List Mode)"
                  : "Remote Resources (Whitelist Mode)",
              defaultFilterProps,
              showColumnFilters: true,
            }}
          />
          {/* Offline warning */}
          {!isOnline && (
            <Alert severity="warning">
              Internet is required to load remote repositories.
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* ───────────── Right: Live Component Preview ───────────── */}
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
          Live Preview
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {isOnline ? (
          <PanDownload theme={theme} {...panDownloadProps} />
        ) : (
          <Alert severity="info">
            Connect to the internet to see the component preview.
          </Alert>
        )}
      </Paper>
      <Paper elevation={2} sx={{ p: 2, overflow: "auto" }}>
        <Typography variant="h6" gutterBottom>
          PanDownload Props
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {/* Network Status */}
          <Box>
            <Typography variant="subtitle2">Network status</Typography>
            <Chip
              label={isOnline ? "Online" : "Offline"}
              color={isOnline ? "success" : "warning"}
              size="small"
            />
          </Box>

          {/* Props Panel */}
          <PropsPanel args={{}} />
          {/* Offline warning */}
          {!isOnline && (
            <Alert severity="warning">
              Internet is required to load remote repositories.
            </Alert>
          )}
        </Stack>
      </Paper>

      {/* ───────────── Right: Live Component Preview ───────────── */}
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
          Live Preview
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {isOnline ? (
          <PanDownload theme={theme} {...panDownloadPropsLegacy} />
        ) : (
          <Alert severity="info">
            Connect to the internet to see the component preview.
          </Alert>
        )}
      </Paper>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
        }}
      >
        <Button onClick={() => setOpenDialoguePanDownload(true)}>
          PanDownload in PanDialogue
        </Button>
        <PanDialog
          isOpen={openDialoguePanDownload}
          closeFn={() => setOpenDialoguePanDownload(false)}
        >
          <DialogContent>
            <PanDownload theme={theme} {...panDownloadProps} />
          </DialogContent>
        </PanDialog>
      </Box>
    </Box>
  );
}
