import { useState } from "react";
import PanFilteredMenu from "../rcl/PanFilteredMenu";

export default function PanFilteredMenuDemo() {
    const [value, setValue] = useState(null);

    const countries = [
        { code: 'AD', label: 'Andorra', phone: '376' },
        { code: 'AI', label: 'Anguilla', phone: '1-264' },
        { code: 'AL', label: 'Albania', phone: '355' },
        { code: 'AM', label: 'Armenia', phone: '374' },
        { code: 'AO', label: 'Angola', phone: '244' },
        { code: 'AQ', label: 'Antarctica', phone: '672' },
        { code: 'AR', label: 'Argentina', phone: '54' },
        { code: 'AS', label: 'American Samoa', phone: '1-684' },
        { code: 'AT', label: 'Austria', phone: '43' },
    ];

    const options = Object.entries(countries).map(([key, value]) => ({
        code: value.code,
        label: value.label,
    }));

    return options.length ? (
        <PanFilteredMenu
            value={value}
            data={options}
            titleLabel="Countries"
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            getOptionLabel={(option) =>
                `${option.label || ''} (${option.code})`
            }
        />
    ) : (
        <p>loading</p>
    );

}