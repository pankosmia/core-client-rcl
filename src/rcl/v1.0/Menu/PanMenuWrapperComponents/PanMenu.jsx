import { Menu } from "@mui/material";

export function PanMenu({ isOpen, setIsOpen, children, anchorEl }) {
  return (
    <Menu onClose={() => setIsOpen(false)} anchorEl={anchorEl} open={isOpen}>
      {children}
    </Menu>
  );
}
