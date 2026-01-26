import {
  AppBar,
  Dialog,
  ThemeProvider,
  Toolbar,
  Typography,
  DialogContent,
} from "@mui/material";
import React from "react";
export default function PanDialog({
  titleLabel,
  isOpen,
  closeFn,
  children,
  theme,
  size = "md",
  fullWidth = true,
}) {
  const Wrapper = theme ? ThemeProvider : React.Fragment;
  const wrapperProps = theme ? { theme } : {};

  return (
    <Wrapper {...wrapperProps}>
      <Dialog
        open={isOpen}
        onClose={closeFn}
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
        fullWidth={fullWidth}
        maxWidth={size}
      >
        <AppBar
          position="sticky"
          sx={{
            position: "relative",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            backgroundColor: theme?.palette?.secondary?.main,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div">
              {titleLabel}
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </Wrapper>
  );
}
