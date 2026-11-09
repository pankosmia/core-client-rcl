import { IconButton, Box } from "@mui/material";
import IconLayout from "./Icons/IconLayout";
import IconSetting from "./Icons/IconSetting";
import WrapperAppBar from "./WrapperAppBar";

export default function AdvancedAppBar({ children }) {
  return (
    <WrapperAppBar>
      {children}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          marginInlineStart: "auto",
        }}
      >
        <IconButton>
          <IconLayout />
        </IconButton>
        <IconButton>
          <IconSetting />
        </IconButton>
        <IconButton>
          {/* Add icon or content for the IconButton here */}
        </IconButton>
      </Box>
    </WrapperAppBar>
  );
}
