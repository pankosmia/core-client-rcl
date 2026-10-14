import {
  Box,
  Button,
  Menu,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PanMenuDrawer } from "./PanMenuWrapperComponents/PanMenuDrawer";
import { PanMenu } from "./PanMenuWrapperComponents/PanMenu";

export default function PanMenuWrapper({
  isOpen,
  setIsOpen,
  anchorEl,
  children,
}) {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  return downSm ? (
    <PanMenuDrawer theme={theme} isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </PanMenuDrawer>
  ) : (
    <PanMenu anchorEl={anchorEl} isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </PanMenu>
  );
}
