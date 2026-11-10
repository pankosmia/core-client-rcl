import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useContext } from "react";
import IconLayout from "./Icons/IconLayout";
import IconSetting from "./Icons/IconSetting";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import WrapperAppBar from "./WrapperAppBar";
import PanMenuWrapper from "../Menu/PanMenuWrapper";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Check from "@mui/icons-material/Check";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import netContext from "../../../rcl/contexts/netContext";
import debugContext from "../../../rcl/contexts/debugContext";
import InternetWarningDialog from "../../InternetWarningDialog";
import { postEmpty } from "pankosmia-lib/http";

export default function AdvancedAppBar({ navigation }) {
  const theme = useTheme();
  const [menuLayout, setMenuLayout] = useState(null);
  const [menuMoreVert, setMenuMoreVert] = useState(null);
  const [menuOpenLayout, setMenuOpenLayout] = useState(false);
  const [menuOpenMoreVert, setMenuOpenMoreVert] = useState(false);
  const { enabledRef } = useContext(netContext);
  const { debugRef } = useContext(debugContext);
  const [internetDialogOpen, setInternetDialogOpen] = useState(false);
  const downsm = useMediaQuery(theme.breakpoints.down("sm"));

  const OpenMenuMoreVert = (event) => {
    setMenuOpenMoreVert(true);
    setMenuMoreVert(event.currentTarget);
  };
  const OpenMenuLayout = (event) => {
    setMenuOpenLayout(true);
    setMenuLayout(event.currentTarget);
  };
  const toggleInternet = () => {
    setMenuOpenMoreVert(false);
    if (enabledRef.current) {
      postEmpty("/api/net/disable", debugRef.current);
    } else {
      setInternetDialogOpen(true);
    }
  };

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
        <IconButton
          color="inherit"
          onClick={OpenMenuLayout}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            "&:hover": { backgroundColor: theme.palette.secondary.main },
          }}
        >
          <IconLayout />
        </IconButton>
        <PanMenuWrapper
          anchorEl={menuLayout}
          setIsOpen={setMenuOpenLayout}
          isOpen={menuOpenLayout}
        >
          <MenuItem>
            <ListItemIcon>{<AddOutlinedIcon />}</ListItemIcon>
            <ListItemText>Add to workspace</ListItemText>
          </MenuItem>
        </PanMenuWrapper>
        {!downsm && (
          <IconButton color="inherit">
            <IconSetting />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={OpenMenuMoreVert}>
          <MoreVertOutlinedIcon />
        </IconButton>
        <PanMenuWrapper
          anchorEl={menuMoreVert}
          setIsOpen={setMenuOpenMoreVert}
          isOpen={menuOpenMoreVert}
        >
          {downsm && (
            <MenuItem>
              <ListItemIcon>{<IconSetting />}</ListItemIcon>
              <ListItemText>Setting</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={toggleInternet}>
            <ListItemIcon>
              {enabledRef.current ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText>Online mode</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>{<EditOutlinedIcon />}</ListItemIcon>
            <ListItemText>My projects</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>{<PictureAsPdfOutlinedIcon />}</ListItemIcon>
            <ListItemText>PDF Publisher</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>{<LibraryBooksOutlinedIcon />}</ListItemIcon>
            <ListItemText>Content Manager</ListItemText>
          </MenuItem>
        </PanMenuWrapper>
        <InternetWarningDialog
          internetDialogOpen={internetDialogOpen}
          setInternetDialogOpen={setInternetDialogOpen}
        />
      </Box>
    </WrapperAppBar>
  );
}
