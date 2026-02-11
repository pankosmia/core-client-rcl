import InternetSwitch from "../rcl/InternetSwitch";
import { useContext } from "react";
import netContext from "../rcl/contexts/netContext";
import debugContext from "../rcl/contexts/debugContext";
import i18nContext from "../rcl/contexts/i18nContext";
import { Box, Button } from "@mui/material";
import { InternetWarningDialog } from "../rcl";
import { useState } from "react";
function InternetSwitchDemo() {
  const { enabledRef } = useContext(netContext);
  const { i18nRef } = useContext(i18nContext);
  const { debugRef } = useContext(debugContext);
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Box>
      <InternetSwitch
        i18n={i18nRef.current}
        netEnabled={enabledRef.current}
        debug={debugRef.current}
      />

      <Box>
        <Button onClick={() => setOpenDialog(true)}>Custom button</Button>
        <InternetWarningDialog
          internetDialogOpen={openDialog}
          setInternetDialogOpen={setOpenDialog}
          callBack={() => console.log("custom button")}
        />
      </Box>
    </Box>
  );
}

export default InternetSwitchDemo;
