import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { doI18n } from "pankosmia-lib/i18n";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Switch,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { getJson } from "pankosmia-lib/http";
export default function AdvancedAppbarMenuBeta({
  listClients,
  i18nRef,
  betaRef,
  debugRef,
  netEnabled,
}) {
  const [menuItemsBeta, setMenuItemsBeta] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const fetched = await getJson("/api/list-clients", debugRef.current);
      if (fetched.ok) {
        setMenuItemsBeta(
          fetched.json.filter((i) => !i.exclude_from_menu && i.requires.beta),
        );
      }
    };
    doFetch().then();
  }, [betaRef.current, debugRef.current]);

  const toggleBeta = (ev) => {
    getJson(`/api/beta/${betaRef.current ? "disable" : "enable"}`).then(() => {
      ev.stopPropagation();
      ev.preventDefault();
    });
  };
  return (
    <>
      {menuItemsBeta.length > 0 && (
        <MenuItem onClick={toggleBeta}>
          <ListItemIcon> </ListItemIcon>
          <ListItemText
            primary={doI18n(`components:header:beta_mode`, i18nRef.current)}
          />
          <Switch edge="end" onChange={toggleBeta} checked={betaRef.current} />
        </MenuItem>
      )}
      {betaRef.current &&
        menuItemsBeta.length > 0 &&
        menuItemsBeta.map((mi, n) => (
          <MenuItem
            key={n}
            disablePadding
            onClick={() => {
              window.location.href = mi.url;
            }}
          >
            <ListItemIcon />
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1em",
                  }}
                >
                  <Typography>
                    {doI18n(`pages:${mi.id}:title`, i18nRef.current)}
                  </Typography>
                  <Box component="span" sx={{ fontSize: "1em", opacity: 0.7 }}>
                    β
                  </Box>
                </Box>
              }
            />
          </MenuItem>
        ))}
    </>
  );
}
