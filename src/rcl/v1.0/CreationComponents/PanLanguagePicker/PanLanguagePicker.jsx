import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import PanFilteredMenu from "../../../PanFilteredMenu";
import { doI18n } from "pankosmia-lib/i18n";
import { getAndSetJson, getJson } from "pankosmia-lib/http";
import i18nContext from "../../../contexts/i18nContext";
import { useContext, useEffect, useState } from "react";

export default function PanLanguagePicker({
  currentLanguage,
  setCurrentLanguage,
  setIsValid,
  open = true,
}) {
  const [languageOption, setLanguageOption] = useState("BCP47List");
  const [errorLangCode, setErrorLangCode] = useState(false);
  const { i18nRef } = useContext(i18nContext);
  const [localRepoOnly, setLocalRepoOnly] = useState(true);
  const [resourcesBurrito, setResourcesBurrito] = useState(false);
  const [burritoSelected, setBurritoSelected] = useState("");
  const [localRepos, setLocalRepos] = useState([]);
  const [nameEdited, setNameEdited] = useState(false);
  const [contentBcpList, setContentBcpList] = useState({});
  const [firstOpen, setFirstOpen] = useState(true);
  const regexLangCode = /^x-[a-z]{3}$/;
  const nameFromCode = (code) => code.replace(/^x-/, "X ");

  useEffect(() => {
    if (open) {
      getAndSetJson({
        url: "/api/git/list-local-repos",
        setter: setLocalRepos,
      }).then();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      getAndSetJson({
        url: "/api/app-resources/lookups/bcp47-language_codes.json",
        setter: setContentBcpList,
      }).then();
    }
  }, [open]);
  const languageCodes = Object.entries(contentBcpList).map(([key, value]) => ({
    language_code: key,
    language_name: value.en,
  }));
  useEffect(() => {
    if (currentLanguage.language_code) {
      setIsValid(!errorLangCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorLangCode]);

  useEffect(() => {
    if (firstOpen && Object.keys(contentBcpList).length > 0) {
      if (currentLanguage.language_code) {
        if (contentBcpList[currentLanguage.language_code]) {
          setCurrentLanguage({
            ...currentLanguage,
            language_code: currentLanguage.language_code,
            language_name: contentBcpList[currentLanguage.language_code].en,
          });
        } else {
          setCurrentLanguage({
            ...currentLanguage,
            language_code: `${currentLanguage.language_code}`,
            language_name: `${currentLanguage.language_name}`,
          });
          setLanguageOption("customLanguage");
        }
      }
      setFirstOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentBcpList, firstOpen, languageCodes]);
  useEffect(() => {
    if (burritoSelected) {
      getJson(`/api/burrito/metadata/summary/${burritoSelected}`)
        .then((res) => res.json)
        .then((data) =>
          setCurrentLanguage({
            ...currentLanguage,
            language_code: data.language_code,
            language_name: data.language_name,
            script_direction: ["ltr", "rtl"].includes(data.script_direction)
              ? data.script_direction
              : currentLanguage?.script_direction,
          }),
        )
        .catch((err) => console.error("Error :", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, burritoSelected]);

  const documents = localRepos.filter(
    (burrito) =>
      (localRepoOnly && burrito.startsWith("_local_")) ||
      (resourcesBurrito && burrito.startsWith("git")),
  );

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl>
        <FormLabel
          sx={{
            color: "text.secondary",
            "&.Mui-focused": { color: "text.secondary" },
          }}
          id="demo-radio-buttons-group-label"
        >
          {doI18n("library:pankosmia-rcl:choose_language", i18nRef.current)}
        </FormLabel>
        <RadioGroup
          row
          value={languageOption}
          onChange={(event) => {
            setLanguageOption(event.target.value);
            setNameEdited(false);
            setCurrentLanguage({
              language_code: "",
              language_name: "",
              script_direction: currentLanguage?.script_direction,
            });
          }}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="BCP47List"
            control={<Radio />}
            label={doI18n(
              "library:pankosmia-rcl:lang_code_bcp47_list",
              i18nRef.current,
            )}
          />

          <FormControlLabel
            value="burrito"
            control={<Radio />}
            label={doI18n(
              "library:pankosmia-rcl:lang_code_burrito",
              i18nRef.current,
            )}
          />

          <FormControlLabel
            value="customLanguage"
            control={<Radio />}
            label={doI18n(
              "library:pankosmia-rcl:lang_code_custom_language",
              i18nRef.current,
            )}
          />
        </RadioGroup>
      </FormControl>
      {languageOption === "BCP47List" && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography>
              {doI18n(
                "library:pankosmia-rcl:description_bcp47_list",
                i18nRef.current,
              )}
            </Typography>
          </Grid>
          <Grid size={6}>
            {contentBcpList && (
              <PanFilteredMenu
                value={currentLanguage.language_code ?? null}
                setValue={(option) =>
                  setCurrentLanguage({
                    ...currentLanguage,
                    language_code: option,
                    language_name: contentBcpList[option]?.en ?? "",
                  })
                }
                data={Object.keys(contentBcpList)}
                getOptionLabel={(option) => {
                  const { en, ...others } = contentBcpList[option] ?? {};
                  const otherValues = Object.values(others);

                  if (otherValues.length > 0) {
                    return `${option} - ${otherValues} - ${en}`;
                  }
                  return en ? `${option} - ${en}` : "";
                }}
                filterOptions={(options, { inputValue }) => {
                  const input = inputValue.toLowerCase();
                  return options
                    .filter((option) => {
                      const entry = contentBcpList[option];
                      return (
                        entry?.en?.toLowerCase().includes(input) ||
                        entry?.[option]?.toLowerCase().includes(input)
                      );
                    })
                    .sort(
                      (a, b) =>
                        contentBcpList[a]?.en?.toLowerCase().indexOf(input) -
                        contentBcpList[b]?.en?.toLowerCase().indexOf(input),
                    );
                }}
                titleLabel={`${doI18n(
                  "library:pankosmia-rcl:language",
                  i18nRef.current,
                )} *`}
              />
            )}
          </Grid>
          <Grid size={6}>
            <TextField
              disabled
              id="language_code"
              sx={{ width: "100%" }}
              label={doI18n("library:pankosmia-rcl:lang_code", i18nRef.current)}
              value={currentLanguage ? currentLanguage.language_code : null}
            />
          </Grid>
        </Grid>
      )}
      {languageOption === "burrito" && (
        <Grid
          container
          spacing={1}
          sx={{
            justifyItems: "flex-end",
            alignItems: "stretch",
          }}
        >
          <Typography>
            {doI18n(
              "library:pankosmia-rcl:description_lang_code_burrito",
              i18nRef.current,
            )}
          </Typography>
          <Grid size={12}>
            <FormLabel>
              {doI18n(
                "library:pankosmia-rcl:title_section_burrito",
                i18nRef.current,
              )}
            </FormLabel>
            <FormGroup row required>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={localRepoOnly}
                    onChange={() => setLocalRepoOnly(!localRepoOnly)}
                    defaultChecked
                  />
                }
                label={doI18n(
                  "library:pankosmia-rcl:local_project",
                  i18nRef.current,
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={resourcesBurrito}
                    onChange={() => setResourcesBurrito(!resourcesBurrito)}
                  />
                }
                label={doI18n(
                  "library:pankosmia-rcl:burrito_resources",
                  i18nRef.current,
                )}
              />
            </FormGroup>
          </Grid>
          <Grid size={12}>
            <PanFilteredMenu
              data={documents}
              setValue={setBurritoSelected}
              getOptionLabel={(option) => `${option}`}
              titleLabel={`${doI18n("library:pankosmia-rcl:document", i18nRef.current)} *`}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              disabled
              id="language_name"
              sx={{ width: "100%" }}
              label={doI18n("library:pankosmia-rcl:lang_name", i18nRef.current)}
              value={currentLanguage ? currentLanguage.language_name : null}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              disabled
              id="language_code"
              sx={{ width: "100%" }}
              label={doI18n("library:pankosmia-rcl:lang_code", i18nRef.current)}
              value={currentLanguage ? currentLanguage.language_code : null}
            />
          </Grid>
        </Grid>
      )}
      {languageOption === "customLanguage" && (
        <Grid
          container
          spacing={1}
          sx={{
            justifyItems: "flex-end",
            alignItems: "stretch",
          }}
        >
          <Grid size={12}>
            <Typography>
              {doI18n(
                "library:pankosmia-rcl:description_custom_language",
                i18nRef.current,
              )}
            </Typography>
          </Grid>
          <Grid size={6}>
            <TextField
              id="language_name"
              required
              sx={{ width: "100%" }}
              label={doI18n("library:pankosmia-rcl:lang_name", i18nRef.current)}
              value={currentLanguage?.language_name ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                setNameEdited(value !== "");
                setCurrentLanguage({
                  ...currentLanguage,
                  language_name: value,
                });
              }}
              onBlur={() => {
                if (!currentLanguage?.language_name) {
                  setNameEdited(false);
                  setCurrentLanguage({
                    ...currentLanguage,
                    language_name: nameFromCode(
                      currentLanguage?.language_code ?? "",
                    ),
                  });
                }
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              id="language_code"
              placeholder="x-abc"
              error={errorLangCode}
              helperText={doI18n(
                "library:pankosmia-rcl:helper_language_code",
                i18nRef.current,
              )}
              required
              sx={{ width: "100%" }}
              label={doI18n("library:pankosmia-rcl:lang_code", i18nRef.current)}
              value={currentLanguage ? currentLanguage.language_code : null}
              onChange={(event) => {
                const value = event.target.value.toLocaleLowerCase();
                setCurrentLanguage({
                  ...currentLanguage,
                  language_code: value,
                  ...(nameEdited ? {} : { language_name: nameFromCode(value) }),
                });
                setErrorLangCode(
                  value.length > 0 && !regexLangCode.test(value),
                );
              }}
            />
          </Grid>
        </Grid>
      )}
      <FormControl sx={{ mt: 2 }}>
        <FormLabel
          sx={{
            color: "text.secondary",
            "&.Mui-focused": { color: "text.secondary" },
          }}
          id="script-direction-label"
        >
          {doI18n("library:pankosmia-rcl:script_direction", i18nRef.current)}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="script-direction-label"
          name="script-direction-group"
          value={currentLanguage?.script_direction === "rtl" ? "rtl" : "ltr"}
          onChange={(event) =>
            setCurrentLanguage({
              ...currentLanguage,
              script_direction: event.target.value,
            })
          }
        >
          <FormControlLabel
            value="ltr"
            control={<Radio />}
            label={doI18n("library:pankosmia-rcl:ltr", i18nRef.current)}
          />
          <FormControlLabel
            value="rtl"
            control={<Radio />}
            label={doI18n("library:pankosmia-rcl:rtl", i18nRef.current)}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
