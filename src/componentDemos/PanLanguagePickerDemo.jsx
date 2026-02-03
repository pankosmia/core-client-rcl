import {useState } from "react";
import {PanLanguagePicker } from "../rcl";

export default function PanLanguagePickerDemo() {
  
    const [currentLanguage, setCurrentLanguage] = useState({ language_code: "", language_name: "" });
    const [languageIsValid,setLanguageIsValid] = useState(false);
    console.log("languageIsValid",languageIsValid)
    return (
        <PanLanguagePicker
            currentLanguage={currentLanguage} 
            setCurrentLanguage={setCurrentLanguage}
            setIsValid={setLanguageIsValid}
            
        />
    );
}