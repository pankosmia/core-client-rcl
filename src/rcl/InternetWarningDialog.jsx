import React, {useContext, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { doI18n, postEmptyJson } from "pithekos-lib";

import debugContext from "./contexts/debugContext";
import i18nContext from "./contexts/i18nContext";
import netContext from "./contexts/netContext";


/**
 * Dialog prompting the user to enable internet connectivity.
 *
 * Automatically closes if internet access is already enabled.
 * When accepted, it enables internet access and executes a callback.
 *
 * @param {Object} props Component properties
 * @param {() => void} [props.callBack]
 *   Function executed after the dialog closes.
 * @param {boolean} props.internetDialogOpen
 *   Controls whether the dialog is visible.
 * @param {(open: boolean) => void} props.setInternetDialogOpen
 *   State setter used to open or close the dialog.
 */
export default function InternetWarningDialog({
  callBack = () => {},
  internetDialogOpen,
  setInternetDialogOpen,
}) {
  const { i18nRef } = useContext(i18nContext);
  const { debugRef } = useContext(debugContext);
  const { enabledRef } = useContext(netContext);

  useEffect(() => {
    if (internetDialogOpen) {
      if (enabledRef.current) {
        handleCloseDialog();
      }
    }
  }, [internetDialogOpen]);

  const handleCloseDialog = () => {
    setInternetDialogOpen(false);
    callBack();
  };

  const enableInternet = () => {
    postEmptyJson("/net/enable", debugRef.current);
  };

  return (
    <Dialog
      open={internetDialogOpen}
      onClose={handleCloseDialog}
      slotProps={{
        paper: {
          component: "form",
        },
      }}
    >
      <DialogTitle>
        <b>
          {doI18n("components:header:internet_question_label", i18nRef.current)}
        </b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            {doI18n("components:header:internet_question", i18nRef.current)}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>
          {doI18n("components:header:cancel", i18nRef.current)}
        </Button>
        <Button
          onClick={() => {
            enableInternet();
            handleCloseDialog();
          }}
        >
          {doI18n("components:header:accept", i18nRef.current)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
