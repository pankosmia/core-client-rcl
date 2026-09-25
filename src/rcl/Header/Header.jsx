import React, { useContext, useEffect } from "react";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import InternetSwitch from "../InternetSwitch";
import { ThemeProvider } from "@mui/material";
import HeaderDrawer from "./HeaderDrawer";
import { doI18n } from "pankosmia-lib/i18n";
import i18nContext from "../contexts/i18nContext";
import netContext from "../contexts/netContext";
import clientConfigContext from "../contexts/clientConfigContext";
import ProductContext from "../contexts/productContext";
function Header({
  titleKey,
  widget,
  currentId,
  theme,
  showInternetSwitch = true,
}) {
  const { i18nRef } = useContext(i18nContext);
  const { clientConfigRef } = useContext(clientConfigContext);
  const { enabledRef } = useContext(netContext);
  const internetAccess =
    clientConfigRef.current["_global"]
      ?.find((e) => e.id === "internetConfig")
      ?.fields.find((e) => e.id === "internetConnectionAccess")?.value ?? true;

  useEffect(() => {
    const appI18n = doI18n("branding:software:name", i18nRef.current);
    const pageI18n = doI18n(titleKey, i18nRef.current);
    document.title = `${pageI18n} - ${appI18n}`;
  });

  const Wrapper = theme ? ThemeProvider : React.Fragment;
  const wrapperProps = theme ? { theme } : {};

  let { product } = useContext(ProductContext);
  let isAndroid = product && product.os === "android";
  return (
    <Wrapper {...wrapperProps}>
      <Box
        sx={{
          display: "flex-start",
          flexGrow: 1,
          m: 0,
          p: 0,
        }}
      >
        <AppBar
          position="static"
          sx={{
            m: 0,
            p: 0,
            paddingTop: isAndroid ? "30px" : "0px",
            paddingLeft: isAndroid ? "30px" : "0px",
            paddingRight: isAndroid ? "30px" : "0px",
          }}
        >
          <Toolbar variant="dense" sx={{ m: 0, p: 0 }}>
            <HeaderDrawer currentId={currentId} />
            {titleKey && titleKey.length > 0 && (
              <Typography variant="h6" sx={{ m: 0, p: 0 }}>
                {doI18n(titleKey, i18nRef.current)}
              </Typography>
            )}
            <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>{widget}</Box>
            <Box sx={{ m: 0, p: 0 }}>
              {internetAccess && showInternetSwitch && (
                <InternetSwitch
                  netEnabled={enabledRef.current}
                  i18n={i18nRef.current}
                  isAndroid={isAndroid}
                />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Wrapper>
  );
}

export default Header;
