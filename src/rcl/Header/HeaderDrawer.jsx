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
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState, useRef, useContext } from "react";
import { doI18n, getJson } from "pithekos-lib";
import netContext from "../contexts/netContext";
import debugContext from "../contexts/debugContext";
import i18nContext from "../contexts/i18nContext";
function HeaderDrawer({ currentId }) {
  const [drawerWidth, setDrawerWidth] = useState("auto");
  const [widthLocked, setWidthLocked] = useState(false);
  const measurementRef = useRef(null);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const { i18nRef } = useContext(i18nContext);
  const { enabledRef } = useContext(netContext);
  const { debugRef } = useContext(debugContext);

  useEffect(() => {
    const doFetch = async () => {
      const fetched = await getJson("/list-clients", debugRef.current);
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
  }, [debugRef.current]);
  const toggleDebug = (ev) => {
    getJson(`/debug/${debugRef.current ? "disable" : "enable"}`).then(() => {
      ev.stopPropagation();
      ev.preventDefault();
    });
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
  return (
    <Box sx={{ m: 0, mr: 2 }}>
      <IconButton onClick={(e) => setDrawerIsOpen(true)}>
        <MenuIcon sx={{ color: "#FFF" }} />
      </IconButton>
      <Drawer
        open={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
        slotProps={{
          paper: { sx: { minWidth:"16rem", overflow: "hidden" } },
        }}
      >
        <Box
          sx={{ width: "100%", minHeight: "98vh", m: 0, p: 0 }}
          role="presentation"
        >
          <List sx={{ height: "100%", width: "100%" }}>
            <Stack
              direction="column"
              spacing={0}
              sx={{
                height: "100%",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ width: "100%" }}>
                {menuItems.map((mi, n) =>
                  mi.id === currentId ? (
                    <ListItem
                      key={n}
                      disablePadding
                      onClick={() => setDrawerIsOpen(false)}
                    >
                      <ListItemButton selected={true}>
                        <ListItemText
                          primary={doI18n(
                            `pages:${mi.id}:title`,
                            i18nRef.current,
                          )}
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
                          primary={doI18n(
                            `pages:${mi.id}:title`,
                            i18nRef.current,
                          )}
                        />
                      </ListItemButton>
                    </ListItem>
                    
                  ),
                )}
              </Box>
              <Box>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={currentId.includes("settings")}
                    onClick={() => {
                      window.location.href = "/clients/settings";
                    }}
                  >
                    <ListItemText
                      primary={doI18n(
                        "pages:core-settings:title",
                        i18nRef.current,
                      )}
                    />
                  </ListItemButton>
                </ListItem>
                  <List disablePadding>
                    <ListItemButton onClick={toggleDebug}>
                      <ListItemText
                        primary={doI18n(
                          `components:header:beta_mode`,
                          i18nRef.current,
                        )} />
                      <Switch
                        edge="end"
                        onChange={toggleDebug}
                        checked={debugRef.current}
                      />
                    </ListItemButton>
                  </List>
              </Box>
            </Stack>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HeaderDrawer;
