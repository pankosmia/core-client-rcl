import React, { useContext, useEffect, useState } from "react";
import { Box, Grid2, IconButton, Tooltip } from "@mui/material";
import { doI18n, getJson, postEmptyJson } from "pithekos-lib";
import InternetWarningDialog from "./InternetWarningDialog";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import I18nContext from "./contexts/i18nContext";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
export default function InternetSwitch({ netEnabled, debug = false }) {
  const { i18nRef } = useContext(I18nContext);

  const [internetDialogOpen, setInternetDialogOpen] = useState(false);
  const [nameProduct, setNameProduct] = useState("");

  const [alignment, setAlignment] = React.useState("offline");
  console.log("alignment", alignment);
  const disableInternet = () => {
    postEmptyJson("/net/disable", debug);
  };

  const handleInternetToggleClick = (event, newAlignment) => {
    if (alignment === "offline") {
      setInternetDialogOpen(true);
      setAlignment(newAlignment);
    } else {
      disableInternet();
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    getJson("/version")
      .then((res) => res.json)
      .then((data) => setNameProduct(data))
      .catch((err) => console.error("Error :", err));
  }, []);

  console.log("setNameProduct", nameProduct);
  return (
    <Box>
      <Grid2 container alignItems="center" spacing={1}>
        <Grid2>
          <ToggleButtonGroup
            onChange={handleInternetToggleClick}
            exclusive
            color="secondary"
            size="small"
            value={alignment}
            sx={{ background: "rgba(255, 255, 255,0.3)" }}
          >
            <ToggleButton
              value="offline"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "rgba(156, 39, 176, 0.5)",
                },
              }}
            >
              <DoneOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              {doI18n("components:header:offline_mode", i18nRef.current)}
            </ToggleButton>

            <ToggleButton
              value="online"
              sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
            >
              {doI18n("components:header:online_mode", i18nRef.current)}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid2>

        <Grid2>
          <Tooltip
            title={doI18n(
              "components:header:tooltip_offline_mode",
              i18nRef.current,
            )}
          >
            <IconButton sx={{ color: "white" }}>
              <HelpOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid2>
      </Grid2>

      <InternetWarningDialog
        internetDialogOpen={internetDialogOpen}
        setInternetDialogOpen={setInternetDialogOpen}
      />
    </Box>
  );
}
