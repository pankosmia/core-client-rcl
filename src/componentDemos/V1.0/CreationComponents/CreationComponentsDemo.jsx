import { useState } from "react";
import { PanLanguagePickerWrapper, PanCopyrightWrapper } from "../../../rcl";
import testJson from "./metadaTest.json";
import { Box, Grid, Typography, Button, Tabs, Tab } from "@mui/material";
import { parseCopyright } from "../../../rcl/v1.0/CreationComponents/PanCopyright/PanCopyrightUtils";

export default function CreationComponentsDemo() {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  /* Language picker */
  const [currentLanguage, setCurrentLanguage] = useState({
    language_code: testJson["_local_/_local_/fr_psle"].language_code,
    language_name: testJson["_local_/_local_/fr_psle"].language_name,
  });

  const [_languageIsValid, setLanguageIsValid] = useState(false);

  /* Copyright */
  const editMode = true;

  const [initialCopyright] = useState(() =>
    parseCopyright(testJson["_local_/_local_/fr_psle"].copyright, { editMode }),
  );
  const [copyright, setCopyright] = useState(initialCopyright.copyright);
  const [optionCopyright, setOptionCopyright] = useState(
    initialCopyright.optionCopyright,
  );

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      {/* Header actions and tabs */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIsReadOnly((prev) => !prev)}
        >
          {isReadOnly ? "Enable editing" : "Set read only"}
        </Button>

        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Language Picker" />
          <Tab label="Copyright" />
        </Tabs>
      </Box>

      {/* Language Picker tab */}
      {activeTab === 0 && (
        <Grid container columns={2}>
          <Grid
            size={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">PSLE test data</Typography>

            <Typography>
              {JSON.stringify({
                language_code:
                  testJson["_local_/_local_/fr_psle"].language_code,
                language_name:
                  testJson["_local_/_local_/fr_psle"].language_name,
              })}
            </Typography>
          </Grid>

          <Grid
            size={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Language Picker
            </Typography>

            <PanLanguagePickerWrapper
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
              setIsValid={setLanguageIsValid}
              readOnly={isReadOnly}
            />
          </Grid>
        </Grid>
      )}

      {/* Copyright tab */}
      {activeTab === 1 && (
        <Grid container columns={2}>
          <Grid
            size={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Copyright test data</Typography>

            <Typography>
              {JSON.stringify({
                copyright: testJson["_local_/_local_/fr_psle"].copyright,
              })}
            </Typography>
          </Grid>

          <Grid
            size={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Copyright Picker
            </Typography>

            <PanCopyrightWrapper
              optionCopyright={optionCopyright}
              setOptionCopyright={setOptionCopyright}
              copyright={copyright}
              setCopyright={setCopyright}
              readOnly={isReadOnly}
              editMode={true}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
