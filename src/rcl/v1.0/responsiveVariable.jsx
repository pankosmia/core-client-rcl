import { useMediaQuery, useTheme } from "@mui/material";

export default function useResponsiveVariables() {
  const theme = useTheme();

  const downsm = useMediaQuery(theme.breakpoints.down("sm"));

  const responsiveVariable = {
    panMarginHorizontal: downsm ? "16px" : "24px",
    panMarginVertical: downsm ? "16px" : "24px",
    panGapHorizontal: downsm ? "16px" : "24px",
    panGapContentSmall: downsm ? "4px" : "8px",
    panGapContentMedium: downsm ? "4px" : "8px",
  };

  return responsiveVariable;
}
