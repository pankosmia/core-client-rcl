import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SectionDialogTitle from "../../../SectionDialogTitle";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../../contexts/i18nContext";
import PanCopyrightPreview from "./PanCopyrightPreview";
import PanCopyrightBuilderDialog from "./PanCopyrightBuilderDialog";

export default function PanCopyright({
  optionCopyright,
  setOptionCopyright,
  setCopyright,
  copyright,
}) {
  const { i18nRef } = useContext(I18nContext);
  const t = (key) => doI18n(`library:pankosmia-rcl:${key}`, i18nRef.current);
  const [builderOpen, setBuilderOpen] = useState(false);

  const update = (patch) => setCopyright({ ...copyright, ...patch });
  const isFree = optionCopyright === "free";

  return (
    <SectionDialogTitle titleSection={t("copyright")}>
      <PanCopyrightPreview
        optionCopyright={optionCopyright}
        copyright={copyright}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl>
          <RadioGroup
            value={optionCopyright}
            onChange={(e) => setOptionCopyright(e.target.value)}
            row
            name="copyright-option"
          >
            <FormControlLabel
              value="unspecified"
              control={<Radio />}
              label={t("unspecified")}
            />
            <FormControlLabel
              value="public-domain"
              control={<Radio />}
              label={t("public_domain")}
            />
            <FormControlLabel
              value="free"
              control={<Radio />}
              label={t("licenced")}
            />
          </RadioGroup>
        </FormControl>

        {/* Always visible, greyed out unless "free" is selected */}
        <TextField
          id="copyright_free_text"
          fullWidth
          required={isFree}
          disabled={!isFree}
          label={t("copyright")}
          value={copyright.free_text}
          onChange={(e) => update({ free_text: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">©</InputAdornment>
              ),
            },
          }}
        />

        <Box>
          <Button
            variant="outlined"
            disabled={!isFree}
            onClick={() => setBuilderOpen(true)}
          >
            {t("copyright_builder")}
          </Button>
        </Box>
      </Box>

      {builderOpen && (
        <PanCopyrightBuilderDialog
          isOpen={builderOpen}
          closeFn={() => setBuilderOpen(false)}
          onApply={(text) => update({ free_text: text })}
        />
      )}
    </SectionDialogTitle>
  );
}
