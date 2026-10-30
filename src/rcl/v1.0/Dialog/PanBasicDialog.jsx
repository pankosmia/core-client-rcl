import React, { useContext } from "react";
import {
  Box,
  Dialog,
  Typography,
  useTheme,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
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
      onKeyDown={(event) => {
        if (event.key !== "Enter") return;
        // Don't trigger on Enter inside a textarea
        const primaryAction = actionsButtonArray?.[1];
        if (
          primaryAction?.props?.actionFn &&
          !primaryAction.props?.isDisabled
        ) {
          event.preventDefault();
          primaryAction.props.actionFn();
        }
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
      {dividers && <Divider />}
      {requiredFieldsLabel && (
        <Box
          sx={{
            paddingTop: dividers ? "16px" : "0px",
            paddingBottom: "16px",
            px: 3,
          }}
        >
          <Typography variant="subtitle2">
            {doI18n(`library:pankosmia-rcl:required_field`, i18nRef.current)}
          </Typography>
        </Box>
      )}
      <DialogContent
        sx={{
          paddingTop: requiredFieldsLabel ? "0px" : "16px",
          paddingBottom: 2,
        }}
      >
        {children}
      </DialogContent>
      {dividers && <Divider />}
      <DialogActions>
        {actionsButtonArray && actionsButtonArray.map((b) => b)}
      </DialogActions>
    </Dialog>
  );
}
