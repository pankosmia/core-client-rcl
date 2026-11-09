import IconButton from "@mui/material/IconButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Typography, Box, Toolbar } from "@mui/material";
import TypographyContext from "../../../rcl/contexts/typographyContext";
import { useContext } from "react";
import WrapperAppBar from "./WrapperAppBar";
export default function BasiqueAppBar({ titleKey }) {
  const { typographyRef } = useContext(TypographyContext);

  return (
    <WrapperAppBar>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        onClick={() => window.history.back()}
      >
        {typographyRef.current.direction === "rtl" ? (
          <ArrowForwardOutlinedIcon />
        ) : (
          <ArrowBackOutlinedIcon />
        )}
      </IconButton>
      <Typography variant="h6">{titleKey}</Typography>
    </WrapperAppBar>
  );
}
