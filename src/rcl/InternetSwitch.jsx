import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { doI18n, getJson, postEmptyJson } from "pithekos-lib";
import InternetWarningDialog from "./InternetWarningDialog";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import I18nContext from "./contexts/i18nContext";
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
      <ToggleButtonGroup
        onChange={handleInternetToggleClick}
        exclusive
        color="secondary"
        size="small"
        value={alignment}
        sx={{ backgroundColor: "secondary", color: "white" }}
      >
        <ToggleButton value="offline">
          {doI18n("components:header:offline_mode", i18nRef.current)}
        </ToggleButton>
        <ToggleButton value="online">
          {doI18n("components:header:online_mode", i18nRef.current)}
        </ToggleButton>
      </ToggleButtonGroup>
      <IconButton>
        <Tooltip
          title={doI18n(
            "components:header:tooltip_offline_mode",
            i18nRef.current,
          )}
        >
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      </IconButton>
      <InternetWarningDialog
        internetDialogOpen={internetDialogOpen}
        setInternetDialogOpen={setInternetDialogOpen}
      />
    </Box>
  );
}
