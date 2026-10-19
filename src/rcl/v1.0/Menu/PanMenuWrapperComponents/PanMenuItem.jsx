import { ListItemIcon, ListItemText, MenuItem, Box } from "@mui/material";

export function PanMenuItem({ icon = null, label, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      {icon ? (
        <ListItemIcon>{icon}</ListItemIcon>
      ) : (
        <Box sx={{ width: "36px", height: "24px" }} />
      )}
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}
