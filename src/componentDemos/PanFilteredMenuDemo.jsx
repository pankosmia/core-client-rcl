import { getJson } from "pithekos-lib";
import PanFilteredMenu from "../rcl/PanFilteredMenu";
import { useEffect, useState } from "react";

export default function PanFilteredMenuDemo() {
    const [languageCode, setLanguageCode] = useState([]);
    const getLanguageCode = async () => {
        const languageCodeResponse = await getJson(`/app-resources/lookups/bcp47-language_codes.json`);
        if (languageCodeResponse.ok) {
            const data = languageCodeResponse.json;
            setLanguageCode(data);
        }
    }

    useEffect(() => {
        getLanguageCode().then()
    }, []);

    return <PanFilteredMenu
        data={languageCode}
        titleLabel="Language"
    />
}