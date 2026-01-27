import { Autocomplete, TextField } from "@mui/material";

export default function PanFilteredMenu({ data, titleLabel, getOptionLabel, value, onChange }) {

    return (
        <Autocomplete
            disablePortal
            value={value}
            onChange={onChange}
            options={data}
            getOptionLabel={getOptionLabel}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={titleLabel} />}
        />
    );
}