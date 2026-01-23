import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getAndSetJson } from "pithekos-lib";

import AuthContext from "../contexts/authContext";
import I18nContext from "../contexts/i18nContext";
import TypographyContext from "../contexts/typographyContext";
import CurrentProjectContext from "../contexts/currentProjectContext";
import BcvContext from "../contexts/bcvContext";
import MessagesContext from "../contexts/messagesContext";
import DebugContext from "../contexts/debugContext";
import NetContext from "../contexts/netContext";

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
          <I18nContext.Provider value={i18nValue}>
            <TypographyContext.Provider value={typographyValue}>
              <AuthContext.Provider value={authValue}>
                <CurrentProjectContext.Provider value={currentProjectValue}>
                  <BcvContext.Provider value={bcvValue}>
                    <MessagesContext.Provider value={messageValue}>
                      <DebugContext.Provider value={debugValue}>
                        <NetContext.Provider value={netValue}>
                          <Box sx={{ height: "100vh", overflow: "hidden" }}>
                            {children}
                          </Box>
                        </NetContext.Provider>
                      </DebugContext.Provider>
                    </MessagesContext.Provider>
                  </BcvContext.Provider>
                </CurrentProjectContext.Provider>
              </AuthContext.Provider>
            </TypographyContext.Provider>
          </I18nContext.Provider>
        </ClientInterfacesContext.Provider>
      </ClientConfigContext.Provider>
    </ThemeProvider>
  );
}

export default AppWrapper;
