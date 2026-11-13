import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import useResponsiveVariables from "../responsiveVariable";

export default function FullPageLayout({ children }) {
  const { panMarginHorizontal, panMarginVertical, panGapHorizontal } =
    useResponsiveVariables();

  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const downLg = useMediaQuery(theme.breakpoints.down("lg"));

  const calculateColumn = () => {
    if (downSm) {
      return 4;
    }
    if (downLg) {
      return 8;
    }
    return 12;
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: panMarginHorizontal,
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        columns={calculateColumn()}
        columnSpacing={panGapHorizontal}
        sx={{
          mx: "auto",
          my: panMarginVertical,
          maxWidth: "1200px",
        }}
      >
        {children}
      </Grid>
    </Box>
  );
}
