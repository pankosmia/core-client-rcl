import { Autocomplete, TextField } from "@mui/material";

export default function PanFilteredMenu({ data, titleLabel, getOptionLabel, value, setValue }) {

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            options={data}
            getOptionLabel={getOptionLabel}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={titleLabel} />}
        />
    );
}