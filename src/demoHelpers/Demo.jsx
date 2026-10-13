import { Grid, Typography } from "@mui/material";

export default function Demo({ children, title }) {
  return (
    <Grid size={12} sx={{ p: 2 }}>
      <Typography variant="h5">{title}</Typography>
      {children}
    </Grid>
  );
}
