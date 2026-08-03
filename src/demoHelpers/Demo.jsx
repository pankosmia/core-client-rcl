import { Grid } from "@mui/material";

export default function Demo({ children, title }) {
  return (
    <Grid size={12} item sx={{ p: 2 }}>
      <h1>{title}</h1>
      {children}
    </Grid>
  );
}
