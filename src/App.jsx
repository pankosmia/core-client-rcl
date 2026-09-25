import { useEffect, useState, useCallback, useContext } from "react";
import { Box } from "@mui/material";
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
} from "./componentDemos";
import Demos from "./demoHelpers/Demos";
import Demo from "./demoHelpers/Demo";
import ProductContext from "./rcl/contexts/productContext";

function App() {
  const [maxWindowHeight, setMaxWindowHeight] = useState(
    window.innerHeight - 64,
  );
  const handleWindowResize = useCallback((event) => {
    setMaxWindowHeight(window.innerHeight - 64);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  let { product } = useContext(ProductContext);

  return (
    <Box sx={{ maxHeight: maxWindowHeight }}>
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
      </Demos>
      <Demo title="ExternalLink">
        <ExternalLinkDemo />
      </Demo>
      <Demo title="Header">
        <HeaderDemo />
      </Demo>
    </Box>
  );
}

export default App;
