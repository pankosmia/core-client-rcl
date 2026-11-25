import { Box, Typography } from "@mui/material";
import PanLanguagePicker from "./PanLanguagePicker";
import { doI18n } from "pankosmia-lib/i18n";
import { useContext } from "react";
import I18nContext from "../../../contexts/i18nContext";
import useResponsiveVariables from "../../responsiveVariable";

export default function PanLanguagePickerWrapper({
  readOnly = true,
  currentLanguage,
  setCurrentLanguage,
  setIsValid,
}) {
  const { i18nRef } = useContext(I18nContext);
  const { panGapContentMedium, panGapContentSmall } = useResponsiveVariables();

  return readOnly ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: panGapContentMedium,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          alignItems: "center",
          gap: panGapContentSmall,
        }}
      >
        <Typography variant="h6">
          {doI18n("library:pankosmia-rcl:language", i18nRef.current)}
        </Typography>

        <Typography sx={{ color: "text.secondary" }} variant="body">
          {currentLanguage.language_name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          alignItems: "center",
          gap: panGapContentSmall,
        }}
      >
        <Typography variant="h6">
          {doI18n("library:pankosmia-rcl:lang_code", i18nRef.current)}
        </Typography>
        <Typography sx={{ color: "text.secondary" }} variant="body">
          {currentLanguage.language_code}
        </Typography>
      </Box>
    </Box>
  ) : (
    <PanLanguagePicker
      setIsValid={setIsValid}
      currentLanguage={currentLanguage}
      setCurrentLanguage={setCurrentLanguage}
    />
  );
}
