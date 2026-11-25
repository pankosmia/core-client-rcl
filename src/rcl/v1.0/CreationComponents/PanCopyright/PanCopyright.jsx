import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SectionDialogTitle from "../../../SectionDialogTitle";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../../contexts/i18nContext";
import { useContext } from "react";
import {
  buildCopyrightString,
  COPYRIGHT_LICENSES,
  COPYRIGHT_VERSIONS,
} from "./PanCopyrightUtils";

export default function PanCopyright({
  optionCopyright,
  setOptionCopyright,
  setCopyright,
  copyright,
  editMode = false,
}) {
  const { i18nRef } = useContext(I18nContext);
  const t = (key) => doI18n(`library:pankosmia-rcl:${key}`, i18nRef.current);

  const update = (patch) => setCopyright({ ...copyright, ...patch });

  const selectedLicense = COPYRIGHT_LICENSES.find(
    (l) => l.value === copyright.license,
  );
  const preview = buildCopyrightString(optionCopyright, copyright);

  return (
    <SectionDialogTitle titleSection={t("copyright")}>
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
          {!editMode && (
            <FormControlLabel
              value="builder"
              control={<Radio />}
              label={t("builder")}
            />
          )}
          <FormControlLabel
            value="free"
            control={<Radio />}
            label={t("free_format")}
          />
        </RadioGroup>
      </FormControl>

      {/* Format libre : le © est ajouté automatiquement */}
      {optionCopyright === "free" && (
        <TextField
          id="copyright_free_text"
          sx={{ width: "100%" }}
          required
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
      )}

      {/* Builder : titulaire, année, licence, version + ordre */}
      {!editMode && optionCopyright === "builder" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="author_name"
            sx={{ width: "100%" }}
            required
            label={t("author_name")}
            value={copyright.author_name}
            onChange={(e) => update({ author_name: e.target.value })}
          />

          <TextField
            id="year"
            sx={{ width: "100%" }}
            required
            label={t("year")}
            helperText="2025 ou 2023/2025"
            value={copyright.year}
            onChange={(e) =>
              update({
                year: e.target.value.replace(/[^\d/]/g, "").slice(0, 9),
              })
            }
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              required
              sx={{ flex: 2 }}
              label={t("license")}
              value={copyright.license}
              onChange={(e) => update({ license: e.target.value })}
            >
              {COPYRIGHT_LICENSES.map((l) => (
                <MenuItem key={l.value} value={l.value}>
                  {l.value}
                </MenuItem>
              ))}
            </TextField>

            {selectedLicense?.versioned && (
              <TextField
                select
                required
                sx={{ flex: 1 }}
                label={t("version")}
                value={copyright.version}
                onChange={(e) => update({ version: e.target.value })}
              >
                {COPYRIGHT_VERSIONS.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>

          <FormControl>
            <RadioGroup
              row
              value={copyright.order}
              onChange={(e) => update({ order: e.target.value })}
            >
              <FormControlLabel
                value="holder_first"
                control={<Radio />}
                label={t("order_holder_first")}
              />
              <FormControlLabel
                value="year_first"
                control={<Radio />}
                label={t("order_year_first")}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}

      {/* Prévisualisation, toujours affichée */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {t("preview")}
        </Typography>
        <Typography
          sx={{ fontStyle: preview ? "normal" : "italic" }}
          color={preview ? "text.primary" : "text.disabled"}
        >
          {preview || t("preview_incomplete")}
        </Typography>
      </Box>
    </SectionDialogTitle>
  );
}
