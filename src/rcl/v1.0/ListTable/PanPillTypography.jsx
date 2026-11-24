import { Typography } from "@mui/material";

export default function PanPillTypography({
  text,
  icon = null,
  truncate = false,
}) {
  return (
    <Typography
      variant="caption"
      sx={{
        px: 1,
        borderRadius: "4px",
        bgcolor: "grey.300",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        minWidth: 0,
        flexShrink: truncate ? 1 : 0,
        overflow: truncate ? "hidden" : "visible",
        "& svg": {
          width: "20px",
          height: "20px",
          color: "action.active",
          flexShrink: 0,
        },
      }}
    >
      {icon}
      <span
        style={{
          minWidth: 0,
          overflow: truncate ? "hidden" : "visible",
          textOverflow: truncate ? "ellipsis" : "clip",
          whiteSpace: "nowrap",
          flexShrink: truncate ? 1 : 0,
        }}
      >
        {text}
      </span>
    </Typography>
  );
}