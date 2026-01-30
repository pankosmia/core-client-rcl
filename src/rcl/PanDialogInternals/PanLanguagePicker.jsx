import { FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import PanFilteredMenu from '../PanFilteredMenu'
export default function PanLanguagePicker({ FormLabel, valueRadio, onClickRadio, FormControlLabel, FormControlLabelValue }) {


    return (
    <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    {`${FormLabel}`}
                </FormLabel>

                <RadioGroup
                    row
                    value={valueRadio}
                    onClick={onClickRadio}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value={FormControlLabelValue} control={<Radio />} label={FormControlLabel} />

                    {/* {/* <FormControlLabel value="burrito" control={<Radio />}
                        label={doI18n("pages:core-contenthandler_text_translation:lang_code_burrito", i18nRef.current)} /> */}

                    <FormControlLabel value="beta" control={<Radio />}
                        label="beta" />
                </RadioGroup>
            </FormControl>
            {/* {languageOption === "BCP47List" &&
                <Grid2 container spacing={2} >
                    <Grid2 item size={12}>
                        <Typography>{doI18n("pages:core-contenthandler_text_translation:description_bcp47_list", i18nRef.current)}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <PanFilteredMenu
                            onChange={(event, newValue) => {
                                setCurrentLanguageCode(newValue)
                            }}
                            data={languageCodes}
                            getOptionLabel={(option) =>
                                `${option.language_name || ''}`}
                            titleLabel={`${doI18n("pages:core-contenthandler_text_translation:lang_name", i18nRef.current)} * `}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_code"
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-contenthandler_text_translation:lang_code", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_code : null}
                        />
                    </Grid2>
                    <TextField
                        id="type"
                        required
                        disabled={true}
                        sx={{ display: "none" }}
                        label={doI18n("pages:core-contenthandler_text_translation:type", i18nRef.current)}
                        value={contentType}
                        onChange={(event) => {
                            setContentType(event.target.value);
                        }}
                    />
                </Grid2>
            }
            {languageOption === "burrito" &&

                <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                    <Typography>{doI18n("pages:core-contenthandler_text_translation:description_lang_code_burrito", i18nRef.current)}</Typography>
                    <Grid2 item size={12}>
                        <FormLabel>{doI18n("pages:core-contenthandler_text_translation:title_section_burrito", i18nRef.current)}</FormLabel>
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
                                label={doI18n("pages:core-contenthandler_text_translation:local_project", i18nRef.current)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='secondary'
                                        checked={resourcesBurrito}
                                        onChange={() => setResourcesBurrito(!resourcesBurrito)}
                                    />
                                }
                                label={doI18n("pages:core-contenthandler_text_translation:burrito_resources", i18nRef.current)}
                            />
                        </FormGroup>
                    </Grid2>
                    <Grid2 item size={12}>
                        <PanFilteredMenu
                            data={burritos}
                            onChange={(event, newValue) => {
                                setBurritoSelected(newValue)
                            }}
                            getOptionLabel={(option) => `${option}`}
                            titleLabel={`${doI18n("pages:core-contenthandler_text_translation:document", i18nRef.current)} *`}

                        />
                    </Grid2>

                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_name"
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-contenthandler_text_translation:lang_name", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_name : null}
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            disabled
                            id="language_code"
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-contenthandler_text_translation:lang_code", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_code : null}
                        />
                    </Grid2>
                </Grid2>
            }
            {languageOption === "customLanguage" &&
                <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                    <Grid2 item size={12}>
                        <Typography>{doI18n("pages:core-contenthandler_text_translation:description_custom_language", i18nRef.current)}</Typography>
                    </Grid2>
                    <Grid2 item size={6}>
                        <TextField
                            id="language_name"
                            required
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-contenthandler_text_translation:lang_name", i18nRef.current)}
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
                            helperText={`${doI18n("pages:core-contenthandler_text_translation:helper_language_code", i18nRef.current)}`}
                            required
                            sx={{ width: "100%" }}
                            label={doI18n("pages:core-contenthandler_text_translation:lang_code", i18nRef.current)}
                            value={currentLanguageCode ? currentLanguageCode.language_code : null}
                            onChange={(event) => {
                                const value = event.target.value.toLocaleLowerCase();
                                setCurrentLanguageCode({ ...currentLanguageCode, language_code: value });
                                setErrorLangCode(!regexLangCode.test(value))
                            }}
                        />
                    </Grid2>
                </Grid2>
            } */}
      </>
    );
}