import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getAndSetJson } from "pithekos-lib";

import authContext from "../contexts/authContext";
import i18nContext from "../contexts/i18nContext";
import typographyContext from "../contexts/typographyContext";
import currentProjectContext from "../contexts/currentProjectContext";
import bcvContext from "../contexts/bcvContext";
import messagesContext from "../contexts/messagesContext";
import debugContext from "../contexts/debugContext";
import netContext from "../contexts/netContext";

import ClientConfigContext from "../contexts/clientConfigContext";
import ClientInterfacesContext from "../contexts/clientInterfacesContext";

function AppWrapper({
  children,
  netValue,
  debugValue,
  bcvValue,
  i18nValue,
  authValue,
  typographyValue,
  currentProjectValue,
  clientConfigValue,
  clientInterfacesValue,
}) {
  const [messages, setMessages] = useState([]);
  const messageValue = { messages, setMessages };
  const { enqueueSnackbar } = useSnackbar();
  const localHandler = (s) => {
    const dataBits = s.split("--");
    if (dataBits.length === 4) {
      enqueueSnackbar(`${dataBits[2]} => ${dataBits[3]}`, {
        variant: dataBits[0],
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((m) => localHandler(m));
      setMessages([]);
    }
  }, [messages]);

  const [themeSpec, setThemeSpec] = useState({
    palette: {
      primary: {
        main: "#666",
      },
      secondary: {
        main: "#888",
      },
    },
  });

  useEffect(() => {
    if (
      themeSpec.palette &&
      themeSpec.palette.primary &&
      themeSpec.palette.primary.main &&
      themeSpec.palette.primary.main === "#666"
    ) {
      getAndSetJson({
        url: "/app-resources/themes/default.json",
        setter: setThemeSpec,
      }).then();
    }
  });

  const theme = createTheme(themeSpec);

  return (
    <ThemeProvider theme={theme}>
      <ClientConfigContext.Provider value={clientConfigValue}>
        <ClientInterfacesContext.Provider value={clientInterfacesValue}>
          <i18nContext.Provider value={i18nValue}>
            <typographyContext.Provider value={typographyValue}>
              <authContext.Provider value={authValue}>
                <currentProjectContext.Provider value={currentProjectValue}>
                  <bcvContext.Provider value={bcvValue}>
                    <messagesContext.Provider value={messageValue}>
                      <debugContext.Provider value={debugValue}>
                        <netContext.Provider value={netValue}>
                          <Box sx={{ height: "100vh", overflow: "hidden" }}>
                            {children}
                          </Box>
                        </netContext.Provider>
                      </debugContext.Provider>
                    </messagesContext.Provider>
                  </bcvContext.Provider>
                </currentProjectContext.Provider>
              </authContext.Provider>
            </typographyContext.Provider>
          </i18nContext.Provider>
        </ClientInterfacesContext.Provider>
      </ClientConfigContext.Provider>
    </ThemeProvider>
  );
}

export default AppWrapper;
