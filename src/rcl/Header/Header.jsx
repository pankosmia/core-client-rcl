import React, { useContext, useEffect, useState } from "react";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import InternetSwitch from "../InternetSwitch";
import { ThemeProvider } from "@mui/material";
import HeaderDrawer from "./HeaderDrawer";
import { i18nContext, doI18n, getJson } from "pithekos-lib";
import clientConfigContext from "../contexts/clientConfigContext";
function Header({ titleKey, widget, currentId, theme }) {
  const { i18nRef } = useContext(i18nContext);
  const { clientConfigRef } = useContext(clientConfigContext);

  const internetAcces =
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

  return (
    <Wrapper {...wrapperProps}>
      <Box display="flex-start" sx={{ flexGrow: 1, m: 0, p: 0 }}>
        <AppBar position="static" sx={{ m: 0, p: 0 }}>
          <Toolbar variant="dense" sx={{ m: 0, p: 0 }}>
            <HeaderDrawer currentId={currentId} />
            {titleKey && titleKey.length > 0 && (
              <Typography variant="h6" sx={{ m: 0, p: 0 }}>
                {doI18n(titleKey, i18nRef.current)}
              </Typography>
            )}
            <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>{widget}</Box>
            <Box sx={{ m: 0, p: 0 }}>
              {internetAcces && <InternetSwitch i18n={i18nRef.current} />}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Wrapper>
  );
}

export default Header;
