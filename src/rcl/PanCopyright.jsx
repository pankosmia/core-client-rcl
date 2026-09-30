import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SectionDialogTitle from "./SectionDialogTitle";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "./contexts/i18nContext";
import { useContext } from "react";

export default function PanCopyright({
  optionCopyright,
  setOptionCopyright,
  setCopyright,
  copyright,
}) {
  const { i18nRef } = useContext(I18nContext);

  const handleChange = (event) => {
    setOptionCopyright(event.target.value);
  };
  return (
    <SectionDialogTitle
      titleSection={doI18n("library:pankosmia-rcl:copyright", i18nRef.current)}
    >
      <FormControl>
        <RadioGroup
          value={optionCopyright}
          onChange={handleChange}
          row
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="unspecified"
            control={<Radio />}
            label={doI18n("library:pankosmia-rcl:unspecified", i18nRef.current)}
          />
          <FormControlLabel
            value="all_rights_reserved"
            control={<Radio />}
            label={doI18n(
              "library:pankosmia-rcl:all_rights_reserved",
              i18nRef.current,
            )}
          />
          <FormControlLabel
            value="public-domain"
            control={<Radio />}
            label={doI18n(
              "library:pankosmia-rcl:public_domain",
              i18nRef.current,
            )}
          />
        </RadioGroup>
      </FormControl>
      {optionCopyright === "all_rights_reserved" && (
        <>
          <TextField
            id="author_name"
            sx={{ width: "100%" }}
            required
            label={doI18n("library:pankosmia-rcl:author_name", i18nRef.current)}
            value={copyright.author_name}
            onChange={(e) =>
              setCopyright({ ...copyright, author_name: e.target.value })
            }
          />

          <TextField
            sx={{ width: "100%" }}
            id="year"
            required
            label={doI18n("library:pankosmia-rcl:year", i18nRef.current)}
            value={copyright.year}
            onChange={(e) =>
              setCopyright({
                ...copyright,
                year: e.target.value.replace(/\D/g, "").slice(0, 4),
              })
            }
          />
        </>
      )}
    </SectionDialogTitle>
  );
}
