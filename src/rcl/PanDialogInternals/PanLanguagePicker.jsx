import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid2, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import PanFilteredMenu from '../PanFilteredMenu'
import { doI18n } from "pithekos-lib";
export default function PanLanguagePicker({ titleLabelRadio, languageOption, setLanguageOption, languageCodeLabel, repos, titleMenuList, titleMenuDocument, currentLanguageCode, setCurrentLanguageCode, languageCodes, getOptionLabelList, getOptionLabelDocument, errorLangCode, setErrorLangCode, regexLangCode, i18nRef, localRepoOnly, setLocalRepoOnly, resourcesBurrito, setResourcesBurrito, setBurritoSelected
}) {

    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    {`${titleLabelRadio}`}
                </FormLabel>
                <RadioGroup
                    row
                    value={languageOption}
                    onChange={event => setLanguageOption(event.target.value)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="BCP47List" control={<Radio />} label={doI18n("pages:core-client-rcl:lang_code_bcp47_list", i18nRef.current)} />

                    <FormControlLabel value="burrito" control={<Radio />}
                        label={doI18n("pages:core-client-rcl:lang_code_burrito", i18nRef.current)} />

                    <FormControlLabel value="customLanguage" control={<Radio />}
                        label={doI18n("pages:core-client-rcl:lang_code_custom_language", i18nRef.current)} />
                </RadioGroup>
            </FormControl>
            {languageOption === "BCP47List" &&
                <Grid2 container spacing={2} >
                    <Grid2 item size={12}>
                        <Typography>{doI18n("pages:core-client-rcl:description_bcp47_list", i18nRef.current)}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <PanFilteredMenu
                            setValue={setCurrentLanguageCode}
                            data={languageCodes}
                            getOptionLabel={getOptionLabelList}
                            titleLabel={titleMenuList}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_code"
                            sx={{ width: "100%" }}
                            label={languageCodeLabel}
                            value={currentLanguageCode ? currentLanguageCode.language_code : null}
                        />
                    </Grid2>

                </Grid2>
            }
            {languageOption === "burrito" &&

                <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                    <Typography>{doI18n("pages:core-client-rcl:description_lang_code_burrito", i18nRef.current)}</Typography>
                    <Grid2 item size={12}>
                        <FormLabel>blabla</FormLabel>
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
                                label={doI18n("pages:core-client-rcl:local_project", i18nRef.current)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='secondary'
                                        checked={resourcesBurrito}
                                        onChange={() => setResourcesBurrito(!resourcesBurrito)}
                                    />
                                }
                                label={doI18n("pages:core-client-rcl:burrito_resources", i18nRef.current)}
                            />
                        </FormGroup>
                    </Grid2>
                    <Grid2 item size={12}>
                        <PanFilteredMenu
                            data={repos}
                            setValue={setBurritoSelected}
                            getOptionLabel={getOptionLabelDocument}
                            titleLabel={titleMenuDocument}

                        />
                    </Grid2>

                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_name"
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-client-rcl:lang_name", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_name : null}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_code"
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-client-rcl:lang_code", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_code : null}
                        />
                    </Grid2>
                </Grid2>
            }
            {languageOption === "customLanguage" &&
                <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                    <Grid2 item size={12}>
                        <Typography>{doI18n("pages:core-client-rcl:description_custom_language", i18nRef.current)}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            id="language_name"
                            required
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-client-rcl:lang_name", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_name : null}
                            onChange={(event) => {
                                const value = event.target.value;
                                setCurrentLanguageCode({ ...currentLanguageCode, language_name: value });
                            }}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            id="language_code"
                            placeholder='x-abc'
                            error={errorLangCode}
                            helperText={doI18n("pages:core-client-rcl:helper_language_code", i18nRef.current)}
                            required
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-client-rcl:lang_code", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_code : null}
                            onChange={(event) => {
                                const value = event.target.value.toLocaleLowerCase();
                                setCurrentLanguageCode({ ...currentLanguageCode, language_code: value });
                                setErrorLangCode(!regexLangCode.test(value))
                            }}
                        />
                    </Grid2>
                </Grid2>
            }
        </>
    );
}