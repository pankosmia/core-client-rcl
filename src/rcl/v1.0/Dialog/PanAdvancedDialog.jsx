import React, { useContext } from "react";
import {
  Box,
  Dialog,
  Typography,
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  DialogContentText,
  Divider,
} from "@mui/material";

import TypographyContext from "../../contexts/typographyContext";
import PanDialogActions from "../../PanDialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../contexts/i18nContext";
export default function PanAdvancedDialog({
  titleLabel,
  isOpen,
  closeFn,
  children,
  actionsButtonArray,
  requiredFieldsLabel = false,
}) {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { i18nRef } = useContext(I18nContext);
  return (
    <Dialog
      fullScreen={downSm}
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
        },
      }}
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {downSm && (
          <IconButton
            sx={{ color: theme.palette.primary.contrastText }}
            onClick={() => {
              closeFn();
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.contrastText }}
          component="div"
        >
          {titleLabel}
        </Typography>

        {actionsButtonArray &&
          downSm &&
          actionsButtonArray[1] &&
          React.cloneElement(actionsButtonArray[1], {
            sx: {
              ...actionsButtonArray[1].props.sx,
              marginInlineStart: "auto",
              color: `${theme.palette.primary.contrastText} !important`,
            },
          })}
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
      <DialogContent sx={{ paddingTop: requiredFieldsLabel ? "0px" : "20px" }}>
        {children}
      </DialogContent>
      {!downSm && <Divider />}
      {!downSm && (
        <DialogActions>
          {actionsButtonArray && actionsButtonArray.map((b) => b)}
        </DialogActions>
      )}
    </Dialog>
  );
}
