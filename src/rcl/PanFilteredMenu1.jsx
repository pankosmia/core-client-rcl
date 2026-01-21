import { Autocomplete, TextField } from "@mui/material";

export default function PanFilteredMenu1({ data, titleLabel }) {

    return (
        <Autocomplete
            disablePortal
            options={Object.values(data)}
            getOptionLabel={(option) => option.en || ""}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={titleLabel} />}
        />
    );
}