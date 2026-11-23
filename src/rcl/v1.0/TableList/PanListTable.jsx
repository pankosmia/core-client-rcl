import {
  CircularProgress,
  ListItem,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import PanPillTypography from "./PanPillTypography";
export function PanListTable({ list }) {
  return list ? (
    <MenuList>
      {list.map((e) => (
        <ListItem>
          <PanPillTypography>{e.abbreviation}</PanPillTypography>
        </ListItem>
      ))}
    </MenuList>
  ) : (
    <CircularProgress />
  );
}
