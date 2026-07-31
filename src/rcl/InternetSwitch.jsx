import React, { useContext, useEffect, useState } from "react";
import { Box, Grid2 } from "@mui/material";
import { getJson, postEmptyJson } from "pankosmia-lib/http";
import { doI18n } from "pankosmia-lib/i18n";
import InternetWarningDialog from "./InternetWarningDialog";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import I18nContext from "./contexts/i18nContext";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { alpha } from "@mui/material/styles";
import ButtonInfo from "./ButtonInfo";

export default function InternetSwitch({ netEnabled, debug = false }) {
  const { i18nRef } = useContext(I18nContext);

  const [internetDialogOpen, setInternetDialogOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const alignment = netEnabled ? "online" : "offline";

  const disableInternet = () => {
    postEmptyJson("/api/net/disable", debug);
  };

  const handleInternetToggleClick = (event, newAlignment) => {
    if (!netEnabled) {
      setInternetDialogOpen(true);
    } else {
      disableInternet();
    }
  };

  useEffect(() => {
    getJson("/api/version")
      .then((res) => res.json)
      .then((data) => setNameProduct(data.product_name))
      .catch((err) => console.error("Error :", err));
  }, []);

  return (
    <Box>
      <Grid2 container alignItems="center" spacing={1}>
        <Grid2>
          <ToggleButtonGroup
            onChange={(event, newAlignment) => {
              if (newAlignment !== null) {
                handleInternetToggleClick(event, newAlignment);
              }
            }}
            exclusive
            color="secondary"
            size="small"
            value={alignment}
            sx={{
              background: (theme) => alpha(theme.palette.common.white, 0.3),
              height: "34px",
            }}
          >
            <ToggleButton
              disableFocusRipple
              value="offline"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: (theme) =>
                    alpha(theme.palette.secondary.main, 1),
                },
                "&.Mui-selected:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.secondary.main, 1),
                  color: "white",
                },
              }}
            >
              {alignment === "offline" && (
                <DoneOutlinedIcon fontSize="small" sx={{ paddingRight: 1 }} />
              )}
              {doI18n("components:header:offline_mode", i18nRef.current)}
            </ToggleButton>

            <ToggleButton
              disableFocusRipple
              value="online"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: (theme) =>
                    alpha(theme.palette.secondary.main, 1),
                },
                "&.Mui-selected:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.secondary.main, 1),
                  color: "white",
                },
              }}
            >
              {alignment === "online" && (
                <DoneOutlinedIcon fontSize="small" sx={{ paddingRight: 1 }} />
              )}
              {doI18n("components:header:online_mode", i18nRef.current)}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid2>

        <Grid2>
          <ButtonInfo
            title={doI18n(
              "components:header:tooltip_offline_mode",
              i18nRef.current,
            ).replace("{1}", nameProduct)}
          />
        </Grid2>
      </Grid2>

      <InternetWarningDialog
        internetDialogOpen={internetDialogOpen}
        setInternetDialogOpen={setInternetDialogOpen}
      />
    </Box>
  );
}
