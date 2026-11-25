import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PanPillTypography from "./PanPillTypography";
import { doI18n } from "pankosmia-lib/i18n";
import { useContext, useRef } from "react";
import I18nContext from "../../contexts/i18nContext";
import useResponsiveVariables from "../responsiveVariable";
import { InfoOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PanListTable({ list }) {
  const { i18nRef } = useContext(I18nContext);
  const { panGapContentMedium, panGapContentSmall } = useResponsiveVariables();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const isRtl = theme.direction === "rtl";

  if (!list) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ width: "100%", minWidth: 0 }}>
      {list.map((e) => (
        <ListItem
          key={e.abbreviation}
          disableGutters
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            minWidth: 0,
            gap: 1,
          }}
        >
          {/* Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 0%",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: panGapContentMedium,
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <Typography sx={{ flexShrink: 0, fontWeight: "bold" }}>
                {e.abbreviation.toUpperCase()}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: panGapContentSmall,
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                <PanPillTypography
                  text={
                    downSm
                      ? e.language_code.toUpperCase()
                      : e.language_name
                        ? `${e.language_code.toUpperCase()} - ${e.language_name}`
                        : e.language_code.toUpperCase()
                  }
                  truncate={true}
                />

                <PanPillTypography
                  text={doI18n(
                    `flavors:names:${e.flavor_type}/${e.flavor}`,
                    i18nRef.current,
                  )}
                  truncate={true}
                />
              </Box>
            </Box>

            <Typography
              sx={{
                width: "100%",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "text.secondary",
              }}
            >
              {isRtl
                ? `${e.description ? `${e.description} - ` : ""}${e.name}`
                : `${e.name}${e.description ? ` - ${e.description}` : ""}`}
            </Typography>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexShrink: 0,
              flexGrow: 0,
            }}
          >
            <IconButton>
              <InfoOutlined />
            </IconButton>

            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
