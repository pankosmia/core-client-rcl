import BasiqueAppBar from "../../../rcl/v1.0/AppBar/BasiqueAppBar";
import WrapperAppBar from "../../../rcl/v1.0/AppBar/WrapperAppBar";
import AdvancedAppBar from "../../../rcl/v1.0/AppBar/AdvancedAppBar";
import { Box, Typography } from "@mui/material";
export default function BasiqueAppBarDemo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>WrapperAppBar</Typography>
      <WrapperAppBar />
      <Typography>BasiqueAppBar</Typography>
      <BasiqueAppBar titleKey={"BasiqueAppBar"} />
      <Typography>AdvancedAppBar</Typography>
      <AdvancedAppBar />
    </Box>
  );
}
