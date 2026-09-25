import { Grid } from "@mui/material";

export default function Demos({ children }) {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
}
