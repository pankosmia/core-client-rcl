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
import { useState, useContext, useEffect } from "react";
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
import i18nContext from "../../../rcl/contexts/i18nContext";
import InternetWarningDialog from "../../InternetWarningDialog";
import { postEmpty, getJson } from "pankosmia-lib/http";
import { doI18n } from "pankosmia-lib/i18n";
import ButtonInfo from "../../ButtonInfo";

export default function AdvancedAppBar({ navigation }) {
  const theme = useTheme();
  const [menuLayout, setMenuLayout] = useState(null);
  const [menuMoreVert, setMenuMoreVert] = useState(null);
  const [menuOpenLayout, setMenuOpenLayout] = useState(false);
  const [menuOpenMoreVert, setMenuOpenMoreVert] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [listClients, setListClients] = useState([]);
  const { enabledRef } = useContext(netContext);
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(i18nContext);
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
  useEffect(() => {
    getJson("/api/version")
      .then((res) => res.json)
      .then((data) => setNameProduct(data.product_name))
      .catch((err) => console.error("Error :", err));
  }, []);
  useEffect(() => {
    getJson("/api/list-clients")
      .then((res) => res.json)
      .then((data) => setListClients(data))
      .catch((err) => console.error("Error :", err));
  }, []);
  const goToClient = (clientId) => {
    const client = listClients.find((c) => c.id === clientId);
    if (client) {
      setMenuOpenMoreVert(false);
      window.location.href = client.url;
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
          {listClients.some(
            (client) => client.id === "core-local-workspace",
          ) && (
            <MenuItem onClick={() => goToClient("core-local-workspace")}>
              <ListItemIcon>{<AddOutlinedIcon />}</ListItemIcon>
              <ListItemText>
                {doI18n("library:pankosmia-rcl:add_workspace", i18nRef.current)}
              </ListItemText>
            </MenuItem>
          )}
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
              <ListItemText>
                {doI18n("library:pankosmia-rcl:setting", i18nRef.current)}
              </ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={toggleInternet} selected={enabledRef.current}>
            <ListItemIcon>
              {enabledRef.current ? <Check fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText>
              {doI18n("library:pankosmia-rcl:online_mode", i18nRef.current)}
            </ListItemText>
            <ListItemIcon>
              <ButtonInfo
                color="primary"
                title={doI18n(
                  "components:header:tooltip_offline_mode",
                  i18nRef.current,
                ).replace("{1}", nameProduct)}
              />
            </ListItemIcon>
          </MenuItem>
          <Divider />
          {listClients.some((client) => client.id === "core-dashboard") && (
            <MenuItem onClick={() => goToClient("core-dashboard")}>
              <ListItemIcon>{<EditOutlinedIcon />}</ListItemIcon>
              <ListItemText>
                {doI18n("library:pankosmia-rcl:my_project", i18nRef.current)}
              </ListItemText>
            </MenuItem>
          )}
          {listClients.some(
            (client) => client.id === "core-client_pdf_publisher",
          ) && (
            <MenuItem onClick={() => goToClient("core-client_pdf_publisher")}>
              <ListItemIcon>{<PictureAsPdfOutlinedIcon />}</ListItemIcon>
              <ListItemText>
                {doI18n("library:pankosmia-rcl:pdf_publisher", i18nRef.current)}
              </ListItemText>
            </MenuItem>
          )}
          {listClients.some((client) => client.id === "content") && (
            <MenuItem onClick={() => goToClient("content")}>
              <ListItemIcon>{<LibraryBooksOutlinedIcon />}</ListItemIcon>
              <ListItemText>
                {doI18n(
                  "library:pankosmia-rcl:content_manager",
                  i18nRef.current,
                )}
              </ListItemText>
            </MenuItem>
          )}
        </PanMenuWrapper>
        <InternetWarningDialog
          internetDialogOpen={internetDialogOpen}
          setInternetDialogOpen={setInternetDialogOpen}
        />
      </Box>
    </WrapperAppBar>
  );
}
