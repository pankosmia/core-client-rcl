import { useEffect, useState, useCallback } from 'react';
import { Box } from "@mui/material";
import { InternetSwitchDemo, AppbarHamburgerDemo, PanDialogDemo, PanTableDemo,PanFilteredMenuDemo } from './componentDemos';
import Demos from './demoHelpers/Demos';
import Demo from './demoHelpers/Demo';

function App() {
  const [maxWindowHeight, setMaxWindowHeight] = useState(window.innerHeight - 64);
  const handleWindowResize = useCallback(event => {
    setMaxWindowHeight(window.innerHeight - 64);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return <Box sx={{ maxHeight: maxWindowHeight }}>
    <Demos>
      <Demo title="Appbar Hamburger">
        <AppbarHamburgerDemo />
      </Demo>
      <Demo title="Internet Switch">
        <InternetSwitchDemo />
      </Demo>
      <Demo title="PanDialog">
        <PanDialogDemo />
      </Demo>
      <Demo title="PanTable">
        <PanTableDemo />
      </Demo>
       <Demo title="PanFilteredMenu">
        <PanFilteredMenuDemo />
      </Demo>
    </Demos>
  </Box>

}

export default App;
