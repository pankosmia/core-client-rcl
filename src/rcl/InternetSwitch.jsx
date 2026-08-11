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
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";
export default function InternetSwitch({
  netEnabled,
  debug = false,
  isAndroid,
}) {
  const { i18nRef } = useContext(I18nContext);

  const [internetDialogOpen, setInternetDialogOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState("");

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
            onChange={(event) => {
              handleInternetToggleClick(event);
            }}
            exclusive
            color="secondary"
            size="small"
            value={netEnabled}
            sx={{
              background: (theme) => alpha(theme.palette.common.white, 0.3),
              height: "34px",
            }}
          >
            {(!isAndroid || !netEnabled) && (
              <ToggleButton
                disableFocusRipple
                value={false}
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
                {!isAndroid ? (
                  !netEnabled && (
                    <DoneOutlinedIcon
                      fontSize="small"
                      sx={{ paddingRight: 1 }}
                    />
                  )
                ) : (
                  <AirplanemodeActiveIcon
                    fontSize="small"
                    sx={{ paddingRight: 1 }}
                  />
                )}
                {doI18n("components:header:offline_mode", i18nRef.current)}
              </ToggleButton>
            )}

            {(!isAndroid || netEnabled) && (
              <ToggleButton
                disableFocusRipple
                value={true}
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
                {!isAndroid ? (
                  netEnabled && (
                    <DoneOutlinedIcon
                      fontSize="small"
                      sx={{ paddingRight: 1 }}
                    />
                  )
                ) : (
                  <AirplanemodeInactiveIcon
                    fontSize="small"
                    sx={{ paddingRight: 1 }}
                  />
                )}
                {doI18n("components:header:online_mode", i18nRef.current)}
              </ToggleButton>
            )}
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
