import { useState } from "react";
import PanDialog from "../rcl/PanDialog";
import PanDialogActions from "../rcl/PanDialogActions";
import { Button, DialogContent, DialogContentText, Checkbox, FormControlLabel, FormGroup, Grid2, Switch, createTheme } from "@mui/material";
import PanStepperPicker from "../rcl/PanStepperPicker";

export default function PanDialogDemo() {
    const [openDialog1, setOpenDialog1] = useState(null);
    const [openDialog2, setOpenDialog2] = useState(null);
    const [openDialog3, setOpenDialog3] = useState(null);
    const [openDialog4, setOpenDialog4] = useState(null);

    const [pointlessInput, setPointlessInput] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
     const handleClose = () => {
        setOpenDialog4(false)
    }

    const actionFn = () => console.log("Doing it!!!");
    const theme = createTheme({
        palette: {
            primary: {
                main: "#C49464",
            },
            secondary: {
                main: "#00473E",
            },
        },
    });
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

    return <>
        <Grid2 container spacing={8}>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog1(event.target)
                }}> Test closeOnAction dialog </Button>
                <PanDialog
                    titleLabel="A Pointless Dialog"
                    isOpen={!!openDialog1}
                    closeFn={() => setOpenDialog1(false)}
                    theme={theme}
                >
                    <DialogContent>
                        <DialogContentText>
                            Text within dialog content goes within DialogContentText.
                        </DialogContentText>
                        <FormGroup>
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
                        </FormGroup>
                    </DialogContent>
                    <PanDialogActions
                        actionFn={actionFn}
                        actionLabel="Do it!"
                        closeFn={() => setOpenDialog1(false)}
                        closeLabel="Don't do it!"
                        isDisabled={!pointlessInput}
                        closeOnAction={false}
                    />
                </PanDialog>
            </Grid2>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog2(event.target)
                }}> open dialog </Button>
                <PanDialog
                    titleLabel="A Pointless Dialog"
                    isOpen={!!openDialog2}
                    closeFn={() => setOpenDialog2(false)}
                >
                    <DialogContent>
                        <DialogContentText>
                            Text within dialog content goes within DialogContentText.
                        </DialogContentText>
                        <FormGroup>
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
                        </FormGroup>
                    </DialogContent>
                    <PanDialogActions
                        actionFn={actionFn}
                        actionLabel="Do it!"
                        closeFn={() => setOpenDialog2(false)}
                        closeLabel="Don't do it!"
                        isDisabled={!pointlessInput}

                    />
                </PanDialog>
            </Grid2>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog3(event.target)
                }}> Test maxWidth dialog </Button>
                <PanDialog
                    titleLabel="maxWidth Dialog"
                    isOpen={!!openDialog3}
                    closeFn={() => setOpenDialog3(false)}
                    size={"lg"}
                    fullWidth={fullWidth}
                >
                    <DialogContent>
                        <DialogContentText>
                            Text within dialog content goes within DialogContentText.
                        </DialogContentText>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={fullWidth}
                                        onChange={() => setFullWidth(!fullWidth)}
                                        slotProps={
                                            {
                                                input: { 'aria-label': 'maxWith-dialog' },
                                            }
                                        }
                                    />
                                } label="Full width"
                            />
                        </FormGroup>
                    </DialogContent>
                    <PanDialogActions
                        closeFn={() => setOpenDialog3(false)}
                        closeLabel="Don't do it!"
                        closeOnAction={false}
                        onlyCloseButton={true}
                    />
                </PanDialog>
            </Grid2>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog4(event.target)
                }}> Test stepper dialog </Button>
                <PanDialog
                    titleLabel="maxWidth Dialog"
                    isOpen={!!openDialog4}
                    closeFn={() => setOpenDialog4(false)}
                    size={"lg"}
                    fullWidth={fullWidth}
                >
                    <DialogContent>
                        <DialogContentText>
                            Text within dialog content goes within DialogContentText.
                        </DialogContentText>
                        <PanStepperPicker handleClose={handleClose} steps={steps} renderStepContent={renderStepContent} isStepValid={isStepValid} handleCreate={handleCreate} />
                    </DialogContent>
                    <PanDialogActions
                        closeFn={() => setOpenDialog4(false)}
                        closeLabel="Don't do it!"
                        closeOnAction={false}
                        onlyCloseButton={true}
                    />
                </PanDialog>
            </Grid2>
        </Grid2>

    </>

}