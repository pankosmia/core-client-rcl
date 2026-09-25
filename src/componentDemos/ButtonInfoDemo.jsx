import { Box } from "@mui/material";
import { ButtonInfo } from "../rcl";

export default function ButtonInfoDemo() {
  // Not remove backgroundColor because the icon is white
  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <ButtonInfo title="Button Component info" />
    </Box>
  );
}
