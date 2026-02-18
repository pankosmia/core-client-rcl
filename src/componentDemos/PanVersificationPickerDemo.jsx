import {useState } from "react";
import { PanVersificationPicker } from "../rcl";

export default function PanVersificationPickerDemo() {
    const open = true
    const [versification, setVersification] = useState("eng");
    
    return (
        <PanVersificationPicker isOpen={open} setVersification={setVersification} versification={versification}/>
    );
}