import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from "@mui/material";

export default function WrapperAppBar({ children }) {
  const theme = useTheme();
  const denseLg = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <AppBar position="static">
      <Toolbar
        sx={{ px: { xs: 2, sm: 3 } }}
        variant={denseLg ? "dense" : "regular"}
      >
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
