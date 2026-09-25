import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function IconInfo({ tooltipLabel }) {
  return (
    <Tooltip title={tooltipLabel}>
      <IconButton disableRipple sx={{ color: "white" }}>
        <HelpOutlineOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
