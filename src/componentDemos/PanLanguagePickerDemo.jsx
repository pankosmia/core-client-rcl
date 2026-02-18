import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { PanLanguagePicker } from "../rcl";

export default function PanLanguagePickerDemo() {
  const [currentLanguage, setCurrentLanguage] = useState({
    language_code: "",
    language_name: "",
  });
  const [_languageIsValid, setLanguageIsValid] = useState(false);

  const [testValue, setTestValue] = useState("");

  // 👇 changing this forces a hard reload
  const [pickerKey, setPickerKey] = useState(0);

  const reloadPicker = () => {
    // update language
    setCurrentLanguage({
      language_code: testValue,
      language_name: "",
    });

    // force unmount + remount
    setPickerKey((prev) => prev + 1);
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField
        label="Language code"
        placeholder="e.g. en, fr, es"
        value={testValue}
        onChange={(e) => setTestValue(e.target.value)}
        size="small"
      />

      <Button variant="contained" onClick={reloadPicker}>
        Reload PanLanguagePicker
      </Button>

      <PanLanguagePicker
        key={pickerKey}                
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        setIsValid={setLanguageIsValid}
      />
    </Stack>
  );
}
