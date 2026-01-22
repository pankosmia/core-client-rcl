import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

/**
 * Recursive component to display prop values
 */
function PropValue({ value, name }) {
  const [open, setOpen] = useState(false);

  const isObject = value && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);

  const toggle = () => setOpen((prev) => !prev);

  let displayValue;

  if (typeof value === "function") {
    displayValue = "ƒ function()";
  } else if (isArray) {
    displayValue = `Array(${value.length})`;
  } else if (isObject) {
    displayValue = `Object(${Object.keys(value).length} keys)`;
  } else {
    displayValue = JSON.stringify(value);
  }

  return (
    <Box sx={{ ml: name ? 1 : 0, mb: 0.5 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {(isArray || isObject) && (
          <IconButton size="small" onClick={toggle}>
            {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        )}
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, minWidth: 120 }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
          {displayValue}
        </Typography>
      </Stack>

      {(isArray || isObject) && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ ml: 3, borderLeft: "1px solid #ccc", pl: 1 }}>
            {isArray &&
              value.map((v, i) => (
                <PropValue key={i} name={`[${i}]`} value={v} />
              ))}
            {isObject &&
              Object.entries(value).map(([k, v]) => (
                <PropValue key={k} name={k} value={v} />
              ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

/**
 * Main props panel
 */
export default function PropsPanel({ args }) {
  return (
    <Box sx={{ p: 2, overflow: "auto" }}>
      <Typography variant="h6" gutterBottom>
        PanDownload Props
      </Typography>

      <Stack spacing={1}>
        {Object.entries(args).map(([key, value]) => (
          <PropValue key={key} name={key} value={value} />
        ))}
      </Stack>
    </Box>
  );
}
