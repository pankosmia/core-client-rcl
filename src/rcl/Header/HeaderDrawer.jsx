import {
  Box,
  IconButton,
  Drawer,
  List,
  Stack,
  ListItemButton,
  ListItemText,
  ListItem,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState, useRef, useContext } from "react";
import { getJson } from "pankosmia-lib/http";
import { doI18n } from "pankosmia-lib/i18n";
import netContext from "../contexts/netContext";
import debugContext from "../contexts/debugContext";
import i18nContext from "../contexts/i18nContext";
import productContext from "../contexts/productContext";
function HeaderDrawer({ currentId }) {
  // eslint-disable-next-line no-unused-vars
  const [drawerWidth, setDrawerWidth] = useState("auto");
  const [widthLocked, setWidthLocked] = useState(false);
  const measurementRef = useRef(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const { i18nRef } = useContext(i18nContext);
  const { enabledRef } = useContext(netContext);
  const { debugRef } = useContext(debugContext);
  const { productRef } = useContext(productContext);

  useEffect(() => {
    const doFetch = async () => {
      const fetched = await getJson("/api/list-clients", debugRef.current);
      if (fetched.ok) {
        setMenuItems(
          fetched.json.filter(
            (i) =>
              !i.exclude_from_menu && (debugRef.current || !i.requires.debug),
          ),
        );
      }
    };
    doFetch().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugRef.current]);
  const toggleDebug = (ev) => {
    getJson(`/api/debug/${debugRef.current ? "disable" : "enable"}`).then(
      () => {
        ev.stopPropagation();
        ev.preventDefault();
      },
    );
  };

  useEffect(() => {
    let timeoutId;
    if (drawerIsOpen && !widthLocked) {
      timeoutId = setTimeout(() => {
        if (measurementRef.current) {
          const width = measurementRef.current.clientWidth;

          if (width > 0) {
            setDrawerWidth(`${width}px`);
            setWidthLocked(true);
          }
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [drawerIsOpen, widthLocked]);

  let isAndroid =
    productRef && productRef.current && productRef.current.os === "android";
  let androidPadding = isAndroid ? "30px" : "0px";

  return (
    <Box sx={{ m: 0, mr: 2 }}>
      <IconButton onClick={(e) => setDrawerIsOpen(true)}>
        <MenuIcon sx={{ color: "#FFF" }} />
      </IconButton>
      <Drawer
        open={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
        sx={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "16rem",
            overflow: "hidden",
            minHeight: isAndroid ? "calc(100vh - 60px)" : "100vh",
            m: 0,
            p: 0,
            paddingTop: androidPadding,
            paddingBottom: androidPadding,
          }}
          role="presentation"
        >
          <List sx={{ width: "100%" }}>
            {menuItems.map((mi, n) =>
              mi.id === currentId ? (
                <ListItem
                  key={n}
                  disablePadding
                  onClick={() => setDrawerIsOpen(false)}
                >
                  <ListItemButton selected={true}>
                    <ListItemText
                      primary={doI18n(`pages:${mi.id}:title`, i18nRef.current)}
                    />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem key={n} disablePadding>
                  <ListItemButton
                    disabled={mi.requires.net && !enabledRef.current}
                    onClick={() => {
                      window.location.href = mi.url;
                    }}
                  >
                    <ListItemText
                      primary={doI18n(`pages:${mi.id}:title`, i18nRef.current)}
                    />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <List sx={{ width: "100%" }}>
            <ListItem disablePadding>
              <ListItemButton
                selected={currentId.includes("settings")}
                onClick={() => {
                  window.location.href = "/clients/settings";
                }}
              >
                <ListItemText
                  primary={doI18n("pages:core-settings:title", i18nRef.current)}
                />
              </ListItemButton>
            </ListItem>
            <ListItemButton onClick={toggleDebug}>
              <ListItemText
                primary={doI18n(`components:header:beta_mode`, i18nRef.current)}
              />
              <Switch
                edge="end"
                onChange={toggleDebug}
                checked={debugRef.current}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HeaderDrawer;
