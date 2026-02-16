import { Box, Button, DialogActions, DialogContentText, Step, StepLabel, Stepper } from "@mui/material";
import { doI18n } from "pithekos-lib";
import { useContext, useState } from "react";
import I18nContext from "./contexts/i18nContext";

export default function PanStepperPicker({ steps, renderStepContent,isStepValid,handleCreate }) {

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const { i18nRef } = useContext(I18nContext);

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleNext = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

        } if (activeStep === steps.length - 1) {
            try {
               await handleCreate();
            } catch (error) {
                console.error("Error create project", error)
            }
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <>
            <Stepper sx={{ position: "sticky" }} activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep !== steps.length && (
                <>
                    <DialogContentText
                        variant='subtitle2'
                        sx={{ paddingBottom: 1 }}
                    >
                        {doI18n(`library:panksomia-rcl:required_field`, i18nRef.current)}
                    </DialogContentText>
                    {renderStepContent(activeStep)}
                </>
            )}
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    {doI18n("library:panksomia-rcl:back_button", i18nRef.current)}
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                >
                    {activeStep === steps.length - 1 ? `${doI18n("library:panksomia-rcl:create", i18nRef.current)}` : `${doI18n("library:panksomia-rcl:next_button", i18nRef.current)}`}
                </Button>

            </DialogActions>
        </>

    );
}