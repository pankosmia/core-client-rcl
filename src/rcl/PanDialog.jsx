import {
  AppBar,
  Dialog,
  ThemeProvider,
  Toolbar,
  Typography,
  DialogContent,
} from "@mui/material";
import React from "react";

/**
 * Generic dialog wrapper with optional theme support and header bar.
 *
 * Provides a consistent dialog layout with a title bar and customizable
 * content area. Supports MUI themes and size configuration.
 *
 * @param {Object} props Component properties
 * @param {string | React.ReactNode} props.titleLabel
 *   Title displayed in the dialog header.
 * @param {boolean} props.isOpen
 *   Controls whether the dialog is open.
 * @param {() => void} props.closeFn
 *   Function called when the dialog is closed.
 * @param {React.ReactNode} props.children
 *   Dialog content.
 * @param {import("@mui/material").Theme} [props.theme]
 *   Optional MUI theme override.
 * @param {"xs" | "sm" | "md" | "lg" | "xl"} [props.size="md"]
 *   Dialog maximum width.
 * @param {boolean} [props.fullWidth=true]
 *   Whether the dialog should take full width.
 */
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
