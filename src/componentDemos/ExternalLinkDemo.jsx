import ExternalLink from "../rcl/ExternalLink";
import { useContext } from "react";
import netContext from "../rcl/contexts/netContext";
import { Box, Stack } from "@mui/material";

function ExternalLinkDemo() {
  const { enabledRef } = useContext(netContext);

  return (
    <Box sx={{ backgroundColor: "lightgray", p: 2 }}>
      <Stack spacing={1}>
        <ExternalLink
          href="https://git-scm.com/community/logos"
          netEnabled={enabledRef.current}
        >
          Git logo
        </ExternalLink>
        <ExternalLink
          href="https://creativecommons.org/licenses/by/3.0/"
          netEnabled={enabledRef.current}
        >
          Creative Commons license
        </ExternalLink>
      </Stack>
    </Box>
  );
}

export default ExternalLinkDemo;
