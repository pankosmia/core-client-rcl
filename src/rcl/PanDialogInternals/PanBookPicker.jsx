import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { doI18n, getJson } from "pithekos-lib";
import I18nContext from "../contexts/i18nContext";
import { useContext, useEffect, useState } from "react";
import sx from "./Selection.styles";
import ListMenuItem from "./ListMenuItem";

export default function PanBookPicker({bookCode,setBookCode,bookAbbr,setBookAbbr,bookTitle,setBookTitle,bookCodes,showVersification,setShowVersification,bookProject}) {
    const { i18nRef } = useContext(I18nContext);
    const [protestantOnly, setProtestantOnly] = useState(true);
    const [clientConfig, setClientConfig] = useState({});
   
    useEffect(() => {
        getJson('/client-config')
            .then((res) => res.json)
            .then((data) => setClientConfig(data))
            .catch((err) => console.error('Error :', err));
    }, []);
    const isProtestantBooksOnlyCheckboxEnabled =
        clientConfig?.['core-contenthandler_text_translation']
            ?.find((section) => section.id === 'config')
            ?.fields?.find((field) => field.id === 'protestantBooksOnlyCheckbox')?.value !== false;

    const isProtestantBooksOnlyDefaultChecked =
        clientConfig?.['core-contenthandler_text_translation']
            ?.find((section) => section.id === 'config')
            ?.fields?.find((field) => field.id === 'protestantBooksOnlyDefaultChecked')?.value !== false;

    useEffect(() => {
        setProtestantOnly(isProtestantBooksOnlyDefaultChecked);
    }, [isProtestantBooksOnlyDefaultChecked]);

    return (
        <>
            <Grid2 container spacing={1} justifyItems="flex-end" alignItems="stretch">
                <Grid2 item size={4}>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="bookCode-label" required htmlFor="bookCode" sx={sx.inputLabel}>
                            {doI18n("library:panksomia-rcl:book_code", i18nRef.current)}
                        </InputLabel>
                        <Select
                            variant="outlined"
                            labelId="bookCode-label"
                            name="bookCode"
                            inputProps={{
                                id: "bookCode",
                            }}
                            value={bookCode}
                            label={doI18n("library:panksomia-rcl:book_code", i18nRef.current)}
                            onChange={(event) => {
                                setBookCode(event.target.value);
                                setBookAbbr(
                                    ["1", "2", "3"].includes(event.target.value[0]) ?
                                        event.target.value.slice(0, 2) + event.target.value[2].toLowerCase() :
                                        event.target.value[0] + event.target.value.slice(1).toLowerCase()
                                );
                                setBookTitle(doI18n(`scripture:books:${event.target.value}`, i18nRef.current))
                            }}
                            sx={sx.select}
                        >
                            {
                                (protestantOnly ? bookCodes.slice(0, 66) : bookCodes).map((listItem, n) =>
                                    <MenuItem key={n} value={listItem} dense disabled={bookProject ? bookProject.includes(listItem) : false}>
                                        <ListMenuItem
                                            listItem={`${listItem} - ${doI18n(`scripture:books:${listItem}`, i18nRef.current)}`} />
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>

                </Grid2>
                <Grid2 item size={4}>
                    <TextField
                        id="bookAbbr"
                        required
                        sx={{ width: "100%" }}
                        label={doI18n("library:panksomia-rcl:book_abbr", i18nRef.current)}
                        value={bookAbbr}
                        onChange={(event) => {
                            setBookAbbr(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 item size={4}>
                    <TextField
                        id="bookTitle"
                        required
                        sx={{ width: "100%" }}
                        label={doI18n("library:panksomia-rcl:book_title", i18nRef.current)}
                        value={bookTitle}
                        onChange={(event) => {
                            setBookTitle(event.target.value);
                        }}
                    />
                </Grid2>
                {isProtestantBooksOnlyCheckboxEnabled && (
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color='secondary'
                                    checked={protestantOnly}
                                    onChange={() => setProtestantOnly(!protestantOnly)}
                                />
                            }
                            label={doI18n("library:panksomia-rcl:protestant_books_only", i18nRef.current)}
                        />
                    </FormGroup>
                )}
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color='secondary'
                                checked={true}
                                disabled
                                onChange={() => setShowVersification(!showVersification)}
                            />
                        }
                        label={doI18n("library:panksomia-rcl:add_versification_checkbox", i18nRef.current)}
                    />
                </FormGroup>
            </Grid2>
        </>
    );
}