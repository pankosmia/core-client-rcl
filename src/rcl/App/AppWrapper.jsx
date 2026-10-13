import React, { useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getAndSetJson } from "pankosmia-lib/http";

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
import SnippetContext from "../contexts/snippetContext";
import WordContext from "../contexts/wordContext";
import ProductContext from "../contexts/productContext";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

function PlaceHolder() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

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
  snippetValue,
  wordValue,
  productValue,
}) {
  const [messages, setMessages] = useState([]);
  const messageValue = { messages, setMessages };

  const { enqueueSnackbar } = useSnackbar();
  const [fontFamily, setFontFamily] = useState("");

  const [fontFamilyCorrespondance, setFontFamilyCorrespondance] =
    useState(null);

  /*
   * IMPORTANT:
   * themeSpec must be declared before any useEffect
   * that uses it.
   */
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

  const [theme, setTheme] = useState(null);

  /*
   * Load the default Pankosmia theme.
   *
   * Only do this once.
   */
  useEffect(() => {
    getAndSetJson({
      url: "/api/app-resources/themes/default.json",
      setter: setThemeSpec,
    }).catch((error) => {
      console.error("Failed to load Pankosmia theme:", error);
    });
  }, []);

  /*
   * Get the fonts available in the browser.
   */
  useEffect(() => {
    let cores = {};
    document.fonts.ready.then(() => {
      document.fonts.forEach((f) => {
        const cleanFamily = f.family
          .replace(/['"]/g, "") // remove quotes " or '
          .trim() // remove leading/trailing spaces
          .replace(/\s+/g, " "); // normalize multiple spaces

        cores[cleanFamily.replaceAll(" ", "")] = cleanFamily;
      });

      setFontFamilyCorrespondance(cores);
    });
  }, []);

  /*
   * Match Pankosmia typography fonts with
   * fonts available in the browser.
   */
  useEffect(() => {
    if (fontFamilyCorrespondance) {
      let stringFront = [];
      let newFont = {};
      let table =
        typographyValue.typographyRef.current.font_set.split("Pankosmia");
      table.shift();
      table = table.map((e) => "Pankosmia" + e);
      Object.entries(fontFamilyCorrespondance).forEach(([k, v]) => {
        let index = table.indexOf(k);
        if (index >= 0) {
          newFont[index] = v;
        }
      });
      for (let e = 0; e < Object.keys(table).length; e++) {
        if (newFont[e]) {
          stringFront.push(newFont[e]);
        }
      }
      setFontFamily(stringFront);
    }
  }, [
    typographyValue.typographyRef.current?.font_set,
    fontFamilyCorrespondance,
  ]);

  /*
   * Display messages through notistack.
   */
  useEffect(() => {
    const localHandler = (s) => {
      const dataBits = s.split("--");

      if (dataBits.length === 4) {
        enqueueSnackbar(`${dataBits[2]} => ${dataBits[3]}`, {
          variant: dataBits[0],
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    };

    if (messages.length > 0) {
      messages.forEach((m) => localHandler(m));
      setMessages([]);
    }
  }, [messages, enqueueSnackbar]);

  useEffect(() => {
    const direction =
      typographyValue?.typography?.direction === "rtl" ? "rtl" : "ltr";

    const newTheme = createTheme(
      {
        direction,
        typography: {
          ...(themeSpec.typography || {}),
          fontFamily: fontFamily.length ? fontFamily.join(",") : "inherit",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                fontFamily: fontFamily.length
                  ? fontFamily.join(",")
                  : undefined,
              },
              body: {
                fontFamily: fontFamily.length
                  ? fontFamily.join(",")
                  : undefined,
              },
              "#root": {
                fontFamily: fontFamily.length
                  ? fontFamily.join(",")
                  : undefined,
              },
              "*, *::before, *::after": {
                fontFamily: "inherit",
              },
            },
          },
          MuiFab: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },

          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },

          MuiToggleButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      },
      themeSpec,
    );

    setTheme(newTheme);
  }, [themeSpec, fontFamily, typographyValue?.typography?.direction]);

  const cache = useMemo(() => {
    if (!theme) {
      return null;
    }

    if (theme.direction === "rtl") {
      return createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      });
    }

    return createCache({
      key: "mui",
      stylisPlugins: [prefixer],
    });
  }, [theme]);

  /*
   * Set document direction.
   */
  useEffect(() => {
    if (theme?.direction) {
      document.documentElement.dir = theme.direction;
    }
  }, [theme?.direction]);

  /*
   * VERY IMPORTANT:
   *
   * Do not render ThemeProvider with theme={null}.
   *
   * This was the cause of:
   *
   * Cannot use 'in' operator to search for '$$material' in null
   */
  if (!theme || !cache) {
    return <PlaceHolder />;
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        //Css CssBaseline give a unified font family if mui theme provider does
        not do
        <CssBaseline />
        <ClientConfigContext.Provider value={clientConfigValue}>
          <ClientInterfacesContext.Provider value={clientInterfacesValue}>
            <I18nContext.Provider value={i18nValue}>
              <SnippetContext.Provider value={snippetValue}>
                <WordContext.Provider value={wordValue}>
                  <TypographyContext.Provider value={typographyValue}>
                    <AuthContext.Provider value={authValue}>
                      <CurrentProjectContext.Provider
                        value={currentProjectValue}
                      >
                        <BcvContext.Provider value={bcvValue}>
                          <MessagesContext.Provider value={messageValue}>
                            <DebugContext.Provider value={debugValue}>
                              <ProductContext.Provider value={productValue}>
                                <NetContext.Provider value={netValue}>
                                  <Box
                                    sx={{
                                      height: "100vh",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {!i18nValue ||
                                    !i18nValue.i18n ||
                                    Object.keys(i18nValue.i18n).length === 0 ? (
                                      <PlaceHolder />
                                    ) : (
                                      children
                                    )}
                                  </Box>
                                </NetContext.Provider>
                              </ProductContext.Provider>
                            </DebugContext.Provider>
                          </MessagesContext.Provider>
                        </BcvContext.Provider>
                      </CurrentProjectContext.Provider>
                    </AuthContext.Provider>
                  </TypographyContext.Provider>
                </WordContext.Provider>
              </SnippetContext.Provider>
            </I18nContext.Provider>
          </ClientInterfacesContext.Provider>
        </ClientConfigContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default AppWrapper;
