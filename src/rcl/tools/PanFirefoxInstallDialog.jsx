import { PanDialog } from "../PanDialog";
import { PanDialogActions } from "../PanDialogActions";
import { DialogContent, DialogContentText } from "@mui/material";
import { PanFirefoxButtonInstall } from "./PanFirefoxButtonInstall";
export function PanFirefoxInstallDialog({ open, setOpen }) {
  return (
    <PanDialog
      titleLabel={doI18n(
        `library:pankosmia-rcl:Firefox_not_installed`,
        i18nRef.current,
      )}
      isOpen={open}
      closeFn={() => setOpen(false)}
      size="sm"
    >
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {doI18n(`library:pankosmia-rcl:need_firefox`, i18nRef.current)}
        </DialogContentText>
        <PanFirefoxButtonInstall />
      </DialogContent>
      <PanDialogActions
        onlyCloseButton
        closeFn={() => handleClose()}
        closeLabel="Close"
      />
    </PanDialog>
  );
}
