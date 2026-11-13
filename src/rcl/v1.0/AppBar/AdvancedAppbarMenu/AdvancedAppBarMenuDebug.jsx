import { useState, useEffect } from "react";
import {
  ListSubheader,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
export default function AdvancedAppBarMenuDebug({
  listClients,
  debugRef,
  i18nRef,
}) {
  const [menuItemsDebug, setMenuItemsDebug] = useState([]);

  useEffect(() => {
    if (debugRef.current) {
      setMenuItemsDebug(
        listClients.filter((i) => !i.exclude_from_menu && i.requires.debug),
      );
    } else {
      setMenuItemsDebug([]);
    }
  }, [debugRef.current]);

  return (
    <>
      <ListSubheader>
        {doI18n(`components:header:debug_mode`, i18nRef.current)}
      </ListSubheader>
      {menuItemsDebug.map((mi, n) => (
        <MenuItem
          inset
          disabled={mi.requires.net && !netEnabled.current}
          onClick={() => {
            window.location.href = mi.url;
          }}
        >
          <ListItemIcon />

          <ListItemText
            primary={doI18n(`pages:${mi.id}:title`, i18nRef.current)}
          />
        </MenuItem>
      ))}
    </>
  );
}
