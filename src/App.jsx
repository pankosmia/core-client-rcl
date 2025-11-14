import { useEffect, useState, useCallback } from 'react';
import { Box } from "@mui/material";
import { InternetSwitchDemo } from './componentDemos';
import DialogExampleDemo from './componentDemos/DialogExampleDemo';
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
      <Demo title="InternetSwitch">
        <InternetSwitchDemo />
      </Demo>
      <Demo title="Dialog">
        <DialogExampleDemo />
      </Demo>
    </Demos>
  </Box>

}

export default App;
