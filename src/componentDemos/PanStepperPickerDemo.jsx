import PanStepperPicker from "../rcl/PanStepperPicker";
import { useContext, useState } from "react";
import {
  Box,
  Checkbox,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { PanDialog } from "../rcl";
import { doI18n } from "pankosmia-lib/i18n";
import I18nContext from "../rcl/contexts/i18nContext";
import { useRef } from "react";
export default function PanStepperPickerDemo() {
  const { i18nRef } = useContext(I18nContext);
  const [pointlessInput, setPointlessInput] = useState(false);
  const steps = [`Step 1`, ` Step 2 `, `Step 3`];
  const [openDialoguePanDownload, setOpenDialoguePanDownload] = useState(false);
  const handleCreate = () => {
    setPointlessInput(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ height: "100vh" }}>
            Step 1
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pointlessInput}
                    onChange={() => setPointlessInput(!pointlessInput)}
                    slotProps={{
                      input: { "aria-label": "pointless-dialog-input" },
                    }}
                  />
                }
                label="Pointless required input"
              />
            </FormGroup>
          </Box>
        );
      case 1:
        return (
          <>
            Step 2
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pointlessInput}
                    onChange={() => setPointlessInput(!pointlessInput)}
                    slotProps={{
                      input: { "aria-label": "pointless-dialog-input" },
                    }}
                  />
                }
                label="Pointless required input"
              />
            </FormGroup>
          </>
        );
      case 2:
        return (
          <>
            Step 3
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pointlessInput}
                    onChange={() => setPointlessInput(!pointlessInput)}
                    slotProps={{
                      input: { "aria-label": "pointless-dialog-input" },
                    }}
                  />
                }
                label="Pointless required input"
              />
            </FormGroup>
          </>
        );
      default:
        return null;
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return pointlessInput === true;
      case 1:
        return pointlessInput === true;
      case 2:
        return pointlessInput === true;
      default:
        return true;
    }
  };

  return (
    <>
      <PanStepperPicker
        requiredFieldsLabel
        steps={steps}
        initialStep={2}
        renderStepContent={renderStepContent}
        isStepValid={isStepValid}
        handleCreate={handleCreate}
        secondaryButtonVariant="secondary"
        secondaryActionKey="library:pankosmia-rcl:back_button"
        isLeftStepperButtonDisabled
        /* primaryAction={() => console.log("Primary action test")}
      secondaryAction={() => console.log("Secondary action test")} */
      />
      <Box sx={{ flex: 1 }}>
        <Button onClick={() => setOpenDialoguePanDownload(true)}>
          {doI18n(
            "pages:core-client-rcl:pan_download_in_dialogue",
            i18nRef.current,
          )}
        </Button>
        <PanDialog
          isOpen={openDialoguePanDownload}
          closeFn={() => setOpenDialoguePanDownload(false)}
        >
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <PanStepperPicker
              requiredFieldsLabel
              steps={steps}
              initialStep={1}
              renderStepContent={renderStepContent}
              isStepValid={isStepValid}
              handleCreate={handleCreate}
              secondaryButtonVariant="secondary"
              secondaryActionKey="library:pankosmia-rcl:back_button"
              isLeftStepperButtonDisabled
              /* primaryAction={() => console.log("Primary action test")}
      secondaryAction={() => console.log("Secondary action test")} */
              isInDialogue={true}
              CustomHeader={() => (
                <Box sx={{ color: "blue", m: 2 }}>
                  this is a custom header, stepperZone height auto adapt
                </Box>
              )}
            />
          </DialogContent>
        </PanDialog>
      </Box>
    </>
  );
}
