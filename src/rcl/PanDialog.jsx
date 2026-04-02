import {
  AppBar,
  Dialog,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import InternetSwitch from "./InternetSwitch";
import React, { useContext } from "react";
import netContext from "../rcl/contexts/netContext";
import debugContext from "../rcl/contexts/debugContext";
import i18nContext from "../rcl/contexts/i18nContext";
import clientConfigContext from "../rcl/contexts/clientConfigContext";
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
  showInternetSwitch = false
}) {
  const Wrapper = theme ? ThemeProvider : React.Fragment;
  const wrapperProps = theme ? { theme } : {};
  const { enabledRef } = useContext(netContext);
  const { i18nRef } = useContext(i18nContext);
  const { debugRef } = useContext(debugContext);
  const { clientConfigRef } = useContext(clientConfigContext);

  const internetAccess =
    clientConfigRef.current["_global"]
      ?.find((e) => e.id === "internetConfig")
      ?.fields.find((e) => e.id === "internetConnectionAccess")?.value ?? true;
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
          <Toolbar sx={{justifyContent:"space-between"}}>
            <Typography variant="h6" component="div">
              {titleLabel}
            </Typography>
            {internetAccess && showInternetSwitch &&
              <InternetSwitch
                i18n={i18nRef.current}
                netEnabled={enabledRef.current}
                debug={debugRef.current}
              />}
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </Wrapper>
  );
}
