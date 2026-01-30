import { useContext, useState } from "react";
import { PanLanguagePicker } from "../rcl";
import { doI18n } from "pithekos-lib";
import i18nContext from "../rcl/contexts/i18nContext";
export default function PanLanguagePickerDemo() {
    const [languageOption, setLanguageOption] = useState("alpha");

    const { i18nRef } = useContext(i18nContext);
    return (
        <PanLanguagePicker
            FormLabel="testlabel"
            valueRadio={languageOption}
            onClickRadio={event => setLanguageOption(event.target.value)}
            FormControlLabel="alpha"
            FormControlLabelValue='alpha'
        />
    );
}