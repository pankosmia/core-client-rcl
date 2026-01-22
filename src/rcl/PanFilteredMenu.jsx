import { Autocomplete, TextField } from "@mui/material";

export default function PanFilteredMenu({ data, titleLabel,getOptionLabel }) {

    return (
        <Autocomplete
            disablePortal
            options={data}
            getOptionLabel={getOptionLabel}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={titleLabel} />}
        />
    );
}