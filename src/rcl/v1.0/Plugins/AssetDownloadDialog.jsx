import PanBasicDialog from "../Dialog/PanBasicDialog";
import PanDialogActionsArray from "../Dialog/PanDialogActionsArray";
import AssetDownloadButton from "./AssetDownloadButton";
import {
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../contexts/i18nContext";
import { useContext } from "react";
export default function AssetDownloadDialog({
  open,
  setOpen,
  handleClose,
  asset,
}) {
  const { i18nRef } = useContext(I18nContext);

  return (
    <PanBasicDialog
      titleLabel={doI18n(
        `library:pankosmia-rcl:Firefox_not_installed`,
        i18nRef.current,
      )}
      isOpen={open}
      closeFn={() => setOpen(false)}
      actionsButtonArray={PanDialogActionsArray({
        closeFn: () => handleClose(),
        closeLabel: doI18n(`library:pankosmia-rcl:cancel`, i18nRef.current),
        onlyCloseButton: true,
      })}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {asset === "firefox" && (
          <Typography variant="body1">
            {doI18n(`library:pankosmia-rcl:need_pdf_engine`, i18nRef.current)}
          </Typography>
        )}
        {asset === "ffmpeg" && (
          <Typography variant="body1">
            {doI18n(`library:pankosmia-rcl:need_ffmpeg`, i18nRef.current)}
          </Typography>
        )}
        <AssetDownloadButton asset={asset} />
      </Stack>
    </PanBasicDialog>
  );
}
