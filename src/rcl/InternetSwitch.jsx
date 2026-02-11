import React, { useState } from "react";
import {
  Box,
  Chip,
} from "@mui/material";
import AirplanemodeInactiveOutlinedIcon from "@mui/icons-material/AirplanemodeInactiveOutlined";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import { doI18n, postEmptyJson } from "pithekos-lib";
import InternetWarningDialog from "./InternetWarningDialog";

export default function InternetSwitch({ i18n, netEnabled, debug = false }) {
  const [internetDialogOpen, setInternetDialogOpen] = useState(false);

  const disableInternet = () => {
    postEmptyJson("/net/disable", debug);
  };

  const handleInternetToggleClick = () => {
    if (!netEnabled) {
      setInternetDialogOpen(true);
    } else {
      disableInternet();
    }
  };

  return (
    <Box>
      <Chip
        icon={
          netEnabled ? (
            <AirplanemodeInactiveOutlinedIcon />
          ) : (
            <AirplanemodeActiveOutlinedIcon />
          )
        }
        label={doI18n("components:header:offline_mode", i18n)}
        onClick={handleInternetToggleClick}
        color={netEnabled ? "appbar-chip-inactive" : "secondary"}
        variant="Filled"
      />
      <InternetWarningDialog
        internetDialogOpen={internetDialogOpen}
        setInternetDialogOpen={setInternetDialogOpen}
      />
    </Box>
  );
}
