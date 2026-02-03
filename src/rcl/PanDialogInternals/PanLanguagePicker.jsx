import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import PanFilteredMenu from '../PanFilteredMenu'
import { doI18n, getAndSetJson, getJson } from "pithekos-lib";
import i18nContext from "../contexts/i18nContext";
import { useContext, useEffect, useState } from "react";

export default function PanLanguagePicker({ currentLanguage, setCurrentLanguage, setIsValid, open = true }) {

    const [languageOption, setLanguageOption] = useState("BCP47List");
    const [errorLangCode, setErrorLangCode] = useState(false);
    const { i18nRef } = useContext(i18nContext);
    const [localRepoOnly, setLocalRepoOnly] = useState(true);
    const [resourcesBurrito, setResourcesBurrito] = useState(false);
    const [burritoSelected, setBurritoSelected] = useState("")
    const [localRepos, setLocalRepos] = useState([]);
    const [contentBcpList, setContentBcpList] = useState({});

    const regexLangCode = /^x-[a-z]{3}$/

    useEffect(() => {
        if (languageOption) {
            setCurrentLanguage({ language_code: "", language_name: "" })
        }
    }, [setCurrentLanguage, languageOption])

    useEffect(
        () => {
            if (open) {
                getAndSetJson({
                    url: "/git/list-local-repos",
                    setter: setLocalRepos
                }).then()
            }
        },
        [open]
    );

    useEffect(
        () => {
            if (open) {
                getAndSetJson({
                    url: "/app-resources/lookups/bcp47-language_codes.json",
                    setter: setContentBcpList
                }).then()
            }
        },
        [open]
    );

      useEffect(
        () => {
            if (errorLangCode === false) {
               setIsValid(true)
            }
        },
        [open,errorLangCode]
    );

    const languageCodes = Object.entries(contentBcpList).map(([key, value]) => ({
        language_code: key,
        language_name: value.en,
    }));
    useEffect(() => {
        if (burritoSelected) {
            getJson(`/burrito/metadata/summary/${burritoSelected}`)
                .then((res) => res.json)
                .then((data) => setCurrentLanguage({ ...currentLanguage, language_code: data.language_code, language_name: data.language_name }))
                .catch((err) => console.error('Error :', err));
        }

    }, [open, burritoSelected]);

    const documents = localRepos.filter(burrito =>
        (localRepoOnly && burrito.startsWith("_local_")) || (resourcesBurrito && burrito.startsWith("git"))
    );

    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    {doI18n("library:panksomia-rcl:choose_language", i18nRef.current)}
                </FormLabel>
                <RadioGroup
                    row
                    value={languageOption}
                    onChange={event => setLanguageOption(event.target.value)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="BCP47List" control={<Radio />} label={doI18n("library:panksomia-rcl:lang_code_bcp47_list", i18nRef.current)} />

                    <FormControlLabel value="burrito" control={<Radio />}
                        label={doI18n("library:panksomia-rcl:lang_code_burrito", i18nRef.current)} />

                    <FormControlLabel value="customLanguage" control={<Radio />}
                        label={doI18n("library:panksomia-rcl:lang_code_custom_language", i18nRef.current)} />
                </RadioGroup>
            </FormControl>
            {languageOption === "BCP47List" &&
                <Grid2 container spacing={2} >
                    <Grid2 item size={12}>
                        <Typography>{doI18n("library:panksomia-rcl:description_bcp47_list", i18nRef.current)}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <PanFilteredMenu
                            setValue={setCurrentLanguage}
                            data={languageCodes}
                            getOptionLabel={(option) =>
                                `${option.language_name || ''} (${option.language_code})`
                            }
                            titleLabel={`${doI18n("library:panksomia-rcl:language", i18nRef.current)} *`}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_code"
                            sx={{ width: "100%" }}
                            label={doI18n("library:panksomia-rcl:lang_code", i18nRef.current)}
                            value={currentLanguage ? currentLanguage.language_code : null}
                        />
                    </Grid2>

                </Grid2>
            }
            {languageOption === "burrito" &&

                <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                    <Typography>{doI18n("library:panksomia-rcl:description_lang_code_burrito", i18nRef.current)}</Typography>
                    <Grid2 item size={12}>
                        <FormLabel>{doI18n("library:panksomia-rcl:title_section_burrito", i18nRef.current)}</FormLabel>
                        <FormGroup row required>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='secondary'
                                        checked={localRepoOnly}
                                        onChange={() => setLocalRepoOnly(!localRepoOnly)}
                                        defaultChecked
                                    />
                                }
                                label={doI18n("library:panksomia-rcl:local_project", i18nRef.current)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='secondary'
                                        checked={resourcesBurrito}
                                        onChange={() => setResourcesBurrito(!resourcesBurrito)}
                                    />
                                }
                                label={doI18n("library:panksomia-rcl:burrito_resources", i18nRef.current)}
                            />
                        </FormGroup>
                    </Grid2>
                    <Grid2 item size={12}>
                        <PanFilteredMenu
                            data={documents}
                            setValue={setBurritoSelected}
                            getOptionLabel={(option) => `${option}`}
                            titleLabel={`${doI18n("library:panksomia-rcl:document", i18nRef.current)} *`}

                        />
                    </Grid2>

                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_name"
                            sx={{ width: "100%" }}
                            label={doI18n("library:panksomia-rcl:lang_name", i18nRef.current)}
                            value={currentLanguage ? currentLanguage.language_name : null}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_code"
                            sx={{ width: "100%" }}
                            label={doI18n("library:panksomia-rcl:lang_code", i18nRef.current)}
                            value={currentLanguage ? currentLanguage.language_code : null}
                        />
                    </Grid2>
                </Grid2>
            }
            {languageOption === "customLanguage" &&
                <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                    <Grid2 item size={12}>
                        <Typography>{doI18n("library:panksomia-rcl:description_custom_language", i18nRef.current)}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            id="language_name"
                            required
                            sx={{ width: "100%" }}
                            label={doI18n("library:panksomia-rcl:lang_name", i18nRef.current)}
                            value={currentLanguage ? currentLanguage.language_name : null}
                            onChange={(event) => {
                                const value = event.target.value;
                                setCurrentLanguage({ ...currentLanguage, language_name: value });
                            }}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            id="language_code"
                            placeholder='x-abc'
                            error={errorLangCode}
                            helperText={doI18n("library:panksomia-rcl:helper_language_code", i18nRef.current)}
                            required
                            sx={{ width: "100%" }}
                            label={doI18n("library:panksomia-rcl:lang_code", i18nRef.current)}
                            value={currentLanguage ? currentLanguage.language_code : null}
                            onChange={(event) => {
                                const value = event.target.value.toLocaleLowerCase();
                                setCurrentLanguage({ ...currentLanguage, language_code: value });
                                setErrorLangCode(!regexLangCode.test(value))
                            }}
                        />
                    </Grid2>
                </Grid2>
            }
        </>
    );
}