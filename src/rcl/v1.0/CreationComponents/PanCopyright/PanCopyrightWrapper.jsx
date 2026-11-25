import { Box, Typography } from "@mui/material";
import PanCopyright from "./PanCopyright";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../../contexts/i18nContext";
import { useContext } from "react";
import { buildCopyrightString } from "./PanCopyrightUtils";
export default function PanCopyrightWrapper({
  readOnly = true,
  editMode = false,
  optionCopyright,
  setOptionCopyright,
  setCopyright,
  copyright,
}) {
  const { i18nRef } = useContext(I18nContext);

  return readOnly ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6">
          {doI18n("library:pankosmia-rcl:copyright", i18nRef.current)}
        </Typography>

        <Typography sx={{ color: "text.secondary" }} variant="body">
          {buildCopyrightString(optionCopyright, copyright)}
        </Typography>
      </Box>
    </Box>
  ) : (
    <PanCopyright
      optionCopyright={optionCopyright}
      setOptionCopyright={setOptionCopyright}
      setCopyright={setCopyright}
      copyright={copyright}
      editMode={editMode}
    />
  );
}
