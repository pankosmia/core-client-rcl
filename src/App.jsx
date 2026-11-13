import { useEffect, useState, useCallback, useContext } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import { postEmpty } from "pankosmia-lib/http";

import {
  PanDownloadDemo,
  InternetSwitchDemo,
  AppbarHamburgerDemo,
  PanDialogDemo,
  PanTableDemo,
  PanFilteredMenuDemo,
  HeaderDemo,
  PanLanguagePickerDemo,
  PanVersificationPickerDemo,
  PanBookPickerDemo,
  PanStepperPickerDemo,
  ButtonInfoDemo,
  ExternalLinkDemo,
  PanCopyrightDemo,
  PanAssetInstallDialogDemo,
  PanAdvancedDialogDemo,
  PanBasicDialogDemo,
  PanMenuWrapperDemo,
  AppBarDemo,
  PanFullPageLayoutDemo,
} from "./componentDemos";

import Demos from "./demoHelpers/Demos";
import Demo from "./demoHelpers/Demo";
import ProductContext from "./rcl/contexts/productContext";
import SectionDialogTitleDemo from "./componentDemos/SectionDialogTitleDemo";
import TypographyContext from "./rcl/contexts/typographyContext";

function App() {
  const [maxWindowHeight, setMaxWindowHeight] = useState(
    window.innerHeight - 64,
  );

  const [tab, setTab] = useState(1);
  const [v1Tab, setV1Tab] = useState(2);

  const handleWindowResize = useCallback(() => {
    setMaxWindowHeight(window.innerHeight - 64);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const { product } = useContext(ProductContext);
  const { typographyRef } = useContext(TypographyContext);

  return (
    <Box sx={{ maxHeight: maxWindowHeight }}>
      <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
        <Tab label="Legacy" />
        <Tab label="1.0" />
      </Tabs>

      {/* Legacy */}
      {tab === 0 && (
        <>
          <Demos>
            {product && (
              <div>{`OS '${product.os}', Server v${product.pkg_version}`}</div>
            )}

            <Demo title="PanLanguagePicker">
              <PanLanguagePickerDemo />
            </Demo>

            <Demo title="PanVersificationPicker">
              <PanVersificationPickerDemo />
            </Demo>

            <Demo title="PanBookPicker">
              <PanBookPickerDemo />
            </Demo>

            <Demo title="PanStepperPicker">
              <PanStepperPickerDemo />
            </Demo>

            <Demo title="Appbar Hamburger">
              <AppbarHamburgerDemo />
            </Demo>

            <Demo title="PanFilteredMenu">
              <PanFilteredMenuDemo />
            </Demo>

            <Demo title="Internet Switch">
              <InternetSwitchDemo />
            </Demo>

            <Demo title="Button Info">
              <ButtonInfoDemo />
            </Demo>

            <Demo title="PanDialog">
              <PanDialogDemo />
            </Demo>

            <Demo title="PanTable">
              <PanTableDemo />
            </Demo>

            <Demo title="PanDownload">
              <PanDownloadDemo />
            </Demo>

            <Demo title="ExternalLink">
              <ExternalLinkDemo />
            </Demo>

            <Demo title="Header">
              <HeaderDemo />
            </Demo>

            <Demo title="PanCopyright">
              <PanCopyrightDemo />
            </Demo>

            <Demo title="Section Dialog Title">
              <SectionDialogTitleDemo />
            </Demo>

            <Demo>
              <PanAssetInstallDialogDemo />
            </Demo>
          </Demos>
        </>
      )}

      {/* 1.0 */}
      {tab === 1 && (
        <>
          <Button
            sx={{ mr: 1 }}
            onClick={() => {
              postEmpty(
                `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/rtl`,
              );
            }}
          >
            RTL
          </Button>

          <Button
            onClick={() => {
              postEmpty(
                `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/ltr`,
              );
            }}
          >
            LTR
          </Button>
          <Tabs
            value={v1Tab}
            onChange={(event, newValue) => setV1Tab(newValue)}
          >
            <Tab label="Dialog" />
            <Tab label="Menu" />
            <Tab label="AppBar" />
            <Tab label="FullPageLayout" />
          </Tabs>

          {v1Tab === 0 && (
            <>
              <Demo title="PanAdvancedDialog">
                <PanAdvancedDialogDemo />
              </Demo>
              <Demo title="PanBasicDialog">
                <PanBasicDialogDemo />
              </Demo>
            </>
          )}

          {v1Tab === 1 && (
            <Demo title="PanMenuWrapper">
              <PanMenuWrapperDemo />
            </Demo>
          )}

          {v1Tab === 2 && (
            <Demo title="AppBar">
              <AppBarDemo />
            </Demo>
          )}
          {v1Tab === 3 && (
            <Demo title="FullPageLayout">
              <PanFullPageLayoutDemo />
            </Demo>
          )}
        </>
      )}
    </Box>
  );
}

export default App;
