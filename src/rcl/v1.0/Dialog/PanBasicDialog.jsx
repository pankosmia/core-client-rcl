import React, { useContext } from "react";
import {
  Box,
  Dialog,
  Typography,
  useTheme,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../contexts/i18nContext";

export default function PanBasicDialog({
  titleLabel,
  isOpen,
  closeFn,
  children,
  actionsButtonArray,
  requiredFieldsLabel = false,
  dividers = false,
}) {
  const theme = useTheme();
  console.log(theme);
  const { i18nRef } = useContext(I18nContext);
  return (
    <Dialog
      onClose={() => closeFn()}
      open={isOpen}
      sx={{ overflow: "hidden" }}
      slotProps={{
        sx: {
          overflow: "hidden !important",
          display: "flex",
          flexDirection: "column",
        },
        paper: {
          component: "form",
          sx: {
            width: "auto",
            minWidth: "280px",
          },
        },
      }}
      maxWidth="sm"
      fullWidth={false}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary }}
          component="div"
        >
          {titleLabel}
        </Typography>
      </DialogTitle>
      {requiredFieldsLabel && (
        <Box
          sx={{
            paddingTop: "20px",
            paddingBottom: "16px",
            px: 4,
          }}
        >
          <Typography variant="subtitle2">
            {doI18n(`library:pankosmia-rcl:required_field`, i18nRef.current)}
          </Typography>
        </Box>
      )}
      <DialogContent
        dividers={dividers}
        sx={{ paddingTop: requiredFieldsLabel ? "0px" : "20px" }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        {actionsButtonArray && actionsButtonArray.map((b) => b)}
      </DialogActions>
    </Dialog>
  );
}
