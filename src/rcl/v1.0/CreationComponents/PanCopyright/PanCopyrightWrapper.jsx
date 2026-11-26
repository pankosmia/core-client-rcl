import { useContext } from "react";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../../../contexts/i18nContext";
import SectionDialogTitle from "../../../SectionDialogTitle";
import PanCopyright from "./PanCopyright";
import PanCopyrightPreview from "./PanCopyrightPreview";

export default function PanCopyrightWrapper({
  readOnly = true,
  optionCopyright,
  setOptionCopyright,
  setCopyright,
  copyright,
}) {
  const { i18nRef } = useContext(I18nContext);

  return readOnly ? (
    <SectionDialogTitle
      titleSection={doI18n("library:pankosmia-rcl:copyright", i18nRef.current)}
    >
      <PanCopyrightPreview
        optionCopyright={optionCopyright}
        copyright={copyright}
      />
    </SectionDialogTitle>
  ) : (
    <PanCopyright
      optionCopyright={optionCopyright}
      setOptionCopyright={setOptionCopyright}
      setCopyright={setCopyright}
      copyright={copyright}
    />
  );
}
