import { IconButton, Box } from "@mui/material";
import IconLayout from "./Icons/IconLayout";
import IconSetting from "./Icons/IconSetting";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import WrapperAppBar from "./WrapperAppBar";

export default function AdvancedAppBar({ navigation }) {
  return (
    <WrapperAppBar>
      {navigation}
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
          <MoreVertOutlinedIcon />
        </IconButton>
      </Box>
    </WrapperAppBar>
  );
}
