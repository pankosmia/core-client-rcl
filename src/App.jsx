import { useEffect, useState, useCallback } from 'react';
import { Grid2 } from "@mui/material";
import {InternetSwitchDemo} from './componentDemos';

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

    return <Grid2 container spacing={2} sx={{ maxHeight: maxWindowHeight }}>
      <Grid2 size={12} item sx={{p:2}}>
          <InternetSwitchDemo/>
      </Grid2>
  </Grid2>
}

export default App;
