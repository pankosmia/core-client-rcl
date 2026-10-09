import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import AssetDownloadDialog from "../rcl/tools/AssetDownloadDialog";
import AssetDownloadButton from "../rcl/tools/AssetDownloadButton";

export default function PanAssetInstallDialogDemo() {
  const [openFirefoxDialog, setOpenFirefoxDialog] = useState(false);
  const [openFfmpegxDialog, setOpenFfmpegDialog] = useState(false);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        PanFirefoxInstallDialog / AssetDownloadButton
      </Typography>

      <Stack spacing={4}>
        {/* Test du PanFirefoxInstallDialog */}
        <Box sx={{ gap: 4, display: "flex" }}>
          <Button
            variant="contained"
            onClick={() => setOpenFirefoxDialog(true)}
          >
            Open Firefox install dialog
          </Button>
          <Button variant="contained" onClick={() => setOpenFfmpegDialog(true)}>
            Open Ffmpeg install dialog
          </Button>
        </Box>
        <AssetDownloadDialog
          open={openFirefoxDialog}
          setOpen={setOpenFirefoxDialog}
          handleClose={() => setOpenFirefoxDialog(false)}
          asset={"firefox"}
        />
        <AssetDownloadDialog
          open={openFfmpegxDialog}
          setOpen={setOpenFfmpegDialog}
          handleClose={() => setOpenFfmpegDialog(false)}
          asset={"ffmpeg"}
        />
        {/* Test direct du AssetDownloadButton */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            AssetDownloadButton — Firefox
          </Typography>

          <AssetDownloadButton asset="firefox" />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            AssetDownloadButton — FFmpeg
          </Typography>

          <AssetDownloadButton asset="ffmpeg" />
        </Box>
      </Stack>
    </Box>
  );
}
