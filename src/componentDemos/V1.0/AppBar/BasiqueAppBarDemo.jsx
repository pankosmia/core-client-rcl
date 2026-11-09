import BasiqueAppBar from "../../../rcl/v1.0/AppBar/BasiqueAppBar";
import { Box } from "@mui/material";
export default function BasiqueAppBarDemo() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "64px",
        "& .MuiAppBar-root": { position: "static" },
      }}
    >
      <BasiqueAppBar titleKey={"BasiqueAppBar"} />
    </Box>
  );
}
