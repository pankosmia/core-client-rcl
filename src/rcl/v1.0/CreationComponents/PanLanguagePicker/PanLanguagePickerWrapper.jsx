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

  const rows = [
    {
      label: "library:pankosmia-rcl:language",
      value: currentLanguage.language_name,
    },
    {
      label: "library:pankosmia-rcl:lang_code",
      value: currentLanguage.language_code,
    },
    {
      label: "library:pankosmia-rcl:script_direction",
      value: currentLanguage.script_direction,
    },
  ];

  return readOnly ? (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "max-content 1fr",
        alignItems: "center",
        columnGap: panGapContentMedium,
        rowGap: panGapContentSmall,
      }}
    >
      {rows.map(({ label, value }) => (
        <Box key={label} sx={{ display: "contents" }}>
          <Typography variant="h6">{doI18n(label, i18nRef.current)}</Typography>
          <Typography sx={{ color: "text.secondary" }} variant="body1">
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  ) : (
    <PanLanguagePicker
      setIsValid={setIsValid}
      currentLanguage={currentLanguage}
      setCurrentLanguage={setCurrentLanguage}
    />
  );
}
