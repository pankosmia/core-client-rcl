import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import I18nContext from "./contexts/i18nContext";
import { doI18n, getAndSetJson } from "pithekos-lib";
import sx from "./Selection.styles";
import ListMenuItem from "./ListMenuItem";

export default function PanVersificationPicker({isOpen, versification,setVersification}) {
    const { i18nRef } = useContext(I18nContext);
    const [versificationCodes, setVersificationCodes] = useState([]);

    useEffect(() => {
        if (isOpen) {
            getAndSetJson({
                url: "/content-utils/versifications",
                setter: setVersificationCodes
            }).then()
        }
    },
        [isOpen]
    );
    return (
        <FormControl sx={{ width: "100%" }}>
            <InputLabel
                id="booksVersification-label"
                required
                htmlFor="booksVersification"
                sx={sx.inputLabel}>
                {doI18n("library:panksomia-rcl:versification_scheme", i18nRef.current)}
            </InputLabel>
            <Select
                variant="outlined"
                required
                labelId="booksVersification-label"
                name="booksVersification"
                inputProps={{
                    id: "bookVersification",
                }}
                value={versification}
                label={doI18n("library:panksomia-rcl:versification_scheme", i18nRef.current)}
                onChange={(event) => {
                    setVersification(event.target.value);
                }}
                sx={sx.select}
            >
                {
                    versificationCodes.map((listItem, n) => <MenuItem key={n} value={listItem}
                        dense>
                        <ListMenuItem
                            listItem={`${listItem.toUpperCase()} - ${doI18n(`scripture:versifications:${listItem}`, i18nRef.current)}`}
                        />
                    </MenuItem>
                    )
                }
            </Select>
            <FormHelperText> {doI18n(`library:panksomia-rcl:helper_versification`, i18nRef.current)}</FormHelperText>
        </FormControl>
    );
}