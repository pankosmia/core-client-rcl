import { useContext, useState } from "react";
import { PanFilteredMenu, PanLanguagePicker } from "../rcl";
import { doI18n } from "pithekos-lib";
import i18nContext from "../rcl/contexts/i18nContext";

export default function PanLanguagePickerDemo() {
    const { i18nRef } = useContext(i18nContext);

    const [languageOption, setLanguageOption] = useState("");
    const [value, setValue] = useState(null);
    const [currentLanguageCode, setCurrentLanguageCode] = useState({ language_code: "", language_name: "" });
    const [errorLangCode, setErrorLangCode] = useState(false);
    const [localRepoOnly, setLocalRepoOnly] = useState(true);
    const [resourcesBurrito, setResourcesBurrito] = useState(false);
    const [burritoSelected, setBurritoSelected] = useState("")

    const countries = [
        { code: 'AD', label: 'Andorra', phone: '376' },
        { code: 'AI', label: 'Anguilla', phone: '1-264' },
        { code: 'AL', label: 'Albania', phone: '355' },
        { code: 'AM', label: 'Armenia', phone: '374' },
        { code: 'AO', label: 'Angola', phone: '244' },
    ];
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 }
    ];
    const country = Object.entries(countries).map(([key, value]) => ({
        code: value.code,
        label: value.label,
    }));

    const repo = Object.entries(top100Films).map(([key, value]) => ({
        code: value.year,
        label: value.label,
    }));
    const regexLangCode = /^x-[a-z]{3}$/
    return (
        <PanLanguagePicker
            titleLabelRadio="LanguagePicker Props"
            i18nRef={i18nRef}
            setLanguageOption={setLanguageOption}
            languageOption={languageOption}
            currentLanguageCode={currentLanguageCode}
            setCurrentLanguageCode={setCurrentLanguageCode}
            languageCodes={country}
            repos={repo}
            titleMenuDocument="Films"
            titleMenuList="Countries"
            errorLangCode={errorLangCode}
            setErrorLangCode={setErrorLangCode}
            getOptionLabelList={(option) =>
                `${option.label || ''} (${option.code})`
            }
            getOptionLabelDocument={(option) =>
                `${option.label || ''} (${option.code})`
            }
            regexLangCode={regexLangCode}
            localRepoOnly={localRepoOnly}
            setLocalRepoOnly={setLocalRepoOnly}
            burritoSelected={burritoSelected}
            setBurritoSelected={setBurritoSelected}
            resourcesBurrito={resourcesBurrito}
            setResourcesBurrito={setResourcesBurrito}
        />
    );
}