import PanDialog from "../PanDialog";
import PanDialogActions from "../PanDialogActions";
import AssetDownloadButton from "./AssetDownloadButton";
import { DialogContent, DialogContentText, Typography } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../contexts/i18nContext";
import { useContext } from "react";
export default function AssetDownloadDialog({
  open,
  setOpen,
  handleClose,
  asset,
}) {
  const { i18nRef } = useContext(I18nContext);

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
          {asset === "firefox" && (
            <Typography>
              {doI18n(`library:pankosmia-rcl:need_pdf_engine`, i18nRef.current)}
            </Typography>
          )}
          {asset === "ffmpeg" && (
            <Typography>
              {doI18n(`library:pankosmia-rcl:need_ffmpeg`, i18nRef.current)}
            </Typography>
          )}
          <Typography>
            {doI18n(`library:pankosmia-rcl:manage_in_setting`, i18nRef.current)}
          </Typography>
        </DialogContentText>
        <AssetDownloadButton asset={asset} />
      </DialogContent>
      <PanDialogActions
        onlyCloseButton
        closeFn={() => handleClose()}
        closeLabel={doI18n(`library:pankosmia-rcl:cancel`, i18nRef.current)}
      />
    </PanDialog>
  );
}
