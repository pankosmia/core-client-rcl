import { useContext, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../../contexts/i18nContext";
import PanAdvancedDialog from "../../../v1.0/Dialog/PanAdvancedDialog";
import PanDialogActionsArray from "../../../v1.0/Dialog/PanDialogActionsArray";
import PanCopyrightPreview from "./PanCopyrightPreview";
import {
  buildCopyrightString,
  COPYRIGHT_LICENSES,
  isCopyrightValid,
  YEAR_REGEX,
  COPYRIGHT_VERSIONS,
} from "./PanCopyrightUtils";

const EMPTY_BUILDER = {
  author_name: "",
  year: "",
  license: "",
  version: "",
  order: "year_first",
};

export default function PanCopyrightBuilderDialog({
  isOpen,
  closeFn,
  onApply,
}) {
  const { i18nRef } = useContext(I18nContext);
  const t = (key) => doI18n(`library:pankosmia-rcl:${key}`, i18nRef.current);

  // Local state: the dialog is unmounted while closed, so it always opens empty
  const [builder, setBuilder] = useState(EMPTY_BUILDER);
  const update = (patch) => setBuilder((b) => ({ ...b, ...patch }));

  const selectedLicense = COPYRIGHT_LICENSES.find(
    (l) => l.value === builder.license,
  );
  const needsVersion = !!selectedLicense?.versioned;

  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && !builder.author_name.trim();
  const yearError = submitted && !YEAR_REGEX.test(builder.year.trim());
  const versionError = submitted && needsVersion && !builder.version;

  const handleOk = () => {
    setSubmitted(true);
    // Stay on the dialog if anything is invalid
    if (!isCopyrightValid("builder", builder)) return;

    // The free-format field already shows a © adornment, so strip a leading one
    const result = buildCopyrightString("builder", builder).replace(
      /^©\s*/,
      "",
    );
    onApply(result);
    closeFn();
  };

  // Licence only: "None" is a real option (empty value), shown in italics
  const noneItem = (
    <MenuItem value="">
      <em>{t("none")}</em>
    </MenuItem>
  );
  const licenceSlotProps = {
    select: { displayEmpty: true },
    inputLabel: { shrink: true },
  };
  return (
    <PanAdvancedDialog
      titleLabel={t("copyright_builder")}
      isOpen={isOpen}
      requiredFieldsLabel
      closeFn={closeFn}
      actionsButtonArray={PanDialogActionsArray({
        actionLabel: t("OK"),
        actionFn: handleOk,
        closeFn,
        closeOnAction: false,
        closeLabel: t("cancel"),
      })}
    >
      <PanCopyrightPreview optionCopyright="builder" copyright={builder} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          required
          error={nameError}
          fullWidth
          label={t("name")}
          value={builder.author_name}
          onChange={(e) => update({ author_name: e.target.value })}
        />

        <TextField
          required
          fullWidth
          error={yearError}
          label={t("year")}
          helperText={t("year_helper")}
          value={builder.year}
          onChange={(e) =>
            update({ year: e.target.value.replace(/[^\d-]/g, "").slice(0, 9) })
          }
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            sx={{ flex: 1 }}
            label={t("licence")}
            value={builder.license}
            onChange={(e) => update({ license: e.target.value, version: "" })}
            slotProps={licenceSlotProps}
          >
            {noneItem}
            {COPYRIGHT_LICENSES.map((l) => (
              <MenuItem key={l.value} value={l.value}>
                {l.value}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            sx={{ flex: 1 }}
            required={needsVersion}
            disabled={!needsVersion}
            error={versionError}
            label={t("version")}
            value={builder.version}
            onChange={(e) => update({ version: e.target.value })}
          >
            {COPYRIGHT_VERSIONS.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <FormControl>
          <FormLabel id="copyright-order-label" sx={{ color: "text.primary" }}>
            {t("order")}
          </FormLabel>
          <RadioGroup
            aria-labelledby="copyright-order-label"
            value={builder.order}
            onChange={(e) => update({ order: e.target.value })}
            sx={{ pl: 1, mt: 1 }}
          >
            <FormControlLabel
              value="year_first"
              control={<Radio />}
              label={t("order_year_first")}
            />
            <FormControlLabel
              value="holder_first"
              control={<Radio />}
              label={t("order_holder_first")}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </PanAdvancedDialog>
  );
}
