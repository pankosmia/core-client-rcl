import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../../contexts/i18nContext";
import { buildCopyrightString } from "./PanCopyrightUtils";

export default function PanCopyrightPreview({ optionCopyright, copyright }) {
  const { i18nRef } = useContext(I18nContext);
  const t = (key) => doI18n(`library:pankosmia-rcl:${key}`, i18nRef.current);

  const preview = buildCopyrightString(optionCopyright, copyright);

  return (
    <Box
      sx={{
        mb: 2,
        px: 2,
        py: 1,
        borderRadius: "4px",
        backgroundColor: "grey.200",
      }}
    >
      <Typography variant="caption" color="text.secondary" display="block">
        {t("preview")}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontStyle: preview ? "normal" : "italic" }}
        color={preview ? "text.primary" : "text.disabled"}
      >
        {preview || t("preview_incomplete")}
      </Typography>
    </Box>
  );
}
