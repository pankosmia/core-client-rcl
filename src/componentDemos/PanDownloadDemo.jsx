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
} from "@mui/material";
import { PanDownload } from "../rcl";
import { netContext } from "pithekos-lib";
import PropsPanel from "./PropsPanel";
export default function PanDownloadDemo() {
  const [mode, setMode] = useState("list"); // "list" | "whitelist"
  const { enabledRef } = useContext(netContext);
  const isOnline = enabledRef?.current ?? false;

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
      showColumnFilters: true,
      sx: { flex: 1 },
    }),
    [mode, defaultFilterProps],
  );

  return (
    <Box
      sx={{
        p: 2,
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 2,
        height: "100vh",
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
          <PanDownload {...panDownloadProps} />
        ) : (
          <Alert severity="info">
            Connect to the internet to see the component preview.
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
