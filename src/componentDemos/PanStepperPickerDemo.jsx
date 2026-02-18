import PanStepperPicker from "../rcl/PanStepperPicker";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function PanStepperPickerDemo() {
    const [pointlessInput, setPointlessInput] = useState(false);
    const steps = [`Step 1`, ` Step 2 `, `Step 3`];

    const handleCreate = () => {
        setPointlessInput(false)
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        Step 1
                        < FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={pointlessInput}
                                        onChange={() => setPointlessInput(!pointlessInput)}
                                        slotProps={
                                            {
                                                input: { 'aria-label': 'pointless-dialog-input' },
                                            }
                                        }
                                    />
                                } label="Pointless required input"
                            />
                        </FormGroup >
                    </>

                );
            case 1:
                return (
                    <>
                        Step 2
                        < FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={pointlessInput}
                                        onChange={() => setPointlessInput(!pointlessInput)}
                                        slotProps={
                                            {
                                                input: { 'aria-label': 'pointless-dialog-input' },
                                            }
                                        }
                                    />
                                } label="Pointless required input"
                            />
                        </FormGroup >
                    </>
                );
            case 2:
                return (
                    <>
                        Step 3
                        < FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={pointlessInput}
                                        onChange={() => setPointlessInput(!pointlessInput)}
                                        slotProps={
                                            {
                                                input: { 'aria-label': 'pointless-dialog-input' },
                                            }
                                        }
                                    />
                                } label="Pointless required input"
                            />
                        </FormGroup >
                    </>

                );
            default:
                return null;
        }
    }

    const isStepValid = (step) => {
        switch (step) {
            case 0:
                return (pointlessInput === true)
            case 1:
                return (pointlessInput === true)
            case 2:
                return (pointlessInput === true)
            default:
                return true;
        }
    };

    return (
        <PanStepperPicker steps={steps} renderStepContent={renderStepContent} isStepValid={isStepValid} handleCreate={handleCreate}/>
    )
}