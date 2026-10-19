import { Box, Menu, MenuList, SwipeableDrawer } from "@mui/material";

export function PanMenuDrawer({ isOpen, setIsOpen, theme, children }) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={() => {}}
      onClose={() => setIsOpen(false)}
      swipeAreaWidth={40}
      PaperProps={{
        sx: {
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* DRAG HANDLE */}
        <Box
          sx={{
            width: "100%",
            paddingY: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.action.active,
            }}
          />
        </Box>

        {/* CONTENT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <MenuList sx={{ marginX: "16px", marginBottom: 2 }}>
            {children}
          </MenuList>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
