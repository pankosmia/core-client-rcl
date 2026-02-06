import { getJson } from "pithekos-lib";
import { useContext, useEffect, useState } from "react";
import DebugContext from "../rcl/contexts/debugContext";
import { PanBookPicker } from "../rcl";

export default function PanBookPickerDemo() {
    const [bookCodes, setBookCodes] = useState([]);
    const [open, setOpen] = useState(true)
    const { debugRef } = useContext(DebugContext);
    const [bookCode, setBookCode] = useState("TIT");
    const [bookTitle, setBookTitle] = useState("Tit");
    const [bookAbbr, setBookAbbr] = useState("Ti");
    //const [showVersification,setShowVersification] = useState(true)

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
        <PanBookPicker
        isOpen={open}
        bookCode={bookCode} 
        setBookCode={setBookCode} 
        bookAbbr={bookAbbr} 
        bookCodes={bookCodes} 
        setBookAbbr={setBookAbbr} 
        bookTitle={bookTitle} 
        setBookTitle={setBookTitle} 
        //showVersification={showVersification} 
        //setShowVersification={setShowVersification}
        />
    );
}