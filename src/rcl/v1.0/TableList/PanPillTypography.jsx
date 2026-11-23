import { Typography } from "@mui/material";

export default function PanPillTypography({ children }) {
  return (
    <Typography
      sx={{ px: 1, borderRadius: "4px", backgroundColor: "grey.300" }}
      variant="caption"
    >
      {children}
    </Typography>
  );
}
