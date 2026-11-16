import { Box, Grid } from "@mui/material";
import FullPageLayout from "../../../rcl/v1.0/FullPageLayout/FullPageLayout";
export default function PanFullPageLayoutDemo() {
  const arr = [1, 2];
  return (
    <FullPageLayout>
      {arr.map((i) => (
        <Grid size={i === 1 ? 4 : "grow"}>
          <Box
            key={i}
            sx={{
              height: "400px",
              backgroundColor: i === 1 ? "#d1b158" : "#d15874",
            }}
          ></Box>
        </Grid>
      ))}
    </FullPageLayout>
  );
}
