import { getJson } from "pithekos-lib";
import { useContext, useEffect, useState } from "react";
import DebugContext from "../rcl/contexts/debugContext";
import { PanBookPicker } from "../rcl";
import { Grid2 } from "@mui/material";

export default function PanBookPickerDemo() {
    const [bookCodes, setBookCodes] = useState([]);
    const [open, setOpen] = useState(true)
    const { debugRef } = useContext(DebugContext);
    const [bookCode, setBookCode] = useState("TIT");
    const [bookTitle, setBookTitle] = useState("Tit");
    const [bookAbbr, setBookAbbr] = useState("Ti");
    const [showVersification, setShowVersification] = useState(true)
    const [bookName, setBookName] = useState(["COL"]);

    useEffect(
        () => {
            const doFetch = async () => {
                const versificationResponse = await getJson("/content-utils/versification/eng", debugRef.current);
                if (versificationResponse.ok) {
                    setBookCodes(Object.keys(versificationResponse.json.maxVerses));
                }
            };
            if (bookCodes.length === 0 && open) {
                doFetch().then();
            }
        }, [open]
    );
    return (
        <Grid2 container spacing={8} minHeight={600}>
            <Grid2 item size={12}>
                <PanBookPicker
                    bookCode={bookCode}
                    setBookCode={setBookCode}
                    bookAbbr={bookAbbr}
                    setBookAbbr={setBookAbbr}
                    bookCodes={bookCodes}
                    bookTitle={bookTitle}
                    setBookTitle={setBookTitle}
                    showVersification={showVersification}
                    setShowVersification={setShowVersification}
                    bookProject={bookName}
                />
            </Grid2>
            <Grid2 item size={12}>
                <PanBookPicker
                    bookCode={bookCode}
                    setBookCode={setBookCode}
                    bookAbbr={bookAbbr}
                    setBookAbbr={setBookAbbr}
                    bookCodes={bookCodes}
                    bookTitle={bookTitle}
                    setBookTitle={setBookTitle}
                    showVersification={showVersification}
                    setShowVersification={setShowVersification}
                    bookProject={bookName}
                    addVerses={false}
                />
            </Grid2>
        </Grid2>
    );
}