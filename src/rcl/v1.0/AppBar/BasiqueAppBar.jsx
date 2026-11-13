import IconButton from "@mui/material/IconButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Typography } from "@mui/material";
import WrapperAppBar from "./WrapperAppBar";
export default function BasiqueAppBar({ titleKey }) {
  return (
    <WrapperAppBar>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        onClick={() => window.history.back()}
      >
        <ArrowBackOutlinedIcon
          sx={{
            transform: (theme) =>
              theme.direction === "rtl" ? "scaleX(-1)" : "none",
          }}
        />
      </IconButton>
      <Typography variant="h6">{titleKey}</Typography>
    </WrapperAppBar>
  );
}
