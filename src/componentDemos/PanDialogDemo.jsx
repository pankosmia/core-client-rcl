import { useState } from "react";
import PanDialog from "../rcl/PanDialog";
import PanDialogActions from "../rcl/PanDialogActions";
import { Button, DialogContent, DialogContentText, Checkbox, FormControlLabel, FormGroup, Grid2 } from "@mui/material";

export default function PanDialogDemo() {
    const [openDialog, setOpenDialog] = useState(null);
    const [openDialog1, setOpenDialog1] = useState(null);
    const [pointlessInput, setPointlessInput] = useState(false);

    const actionFn = () => console.log("Doing it!!!");

    return <>
        <Grid2 container spacing={8} minHeight={350}>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog1(event.target)
                }}> Test close dialog </Button>
                <PanDialog
                    titleLabel="A Pointless Dialog"
                    isOpen={!!openDialog1}
                    closeFn={() => setOpenDialog1(false)}
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
                    setOpenDialog(event.target)
                }}> open dialog </Button>
                <PanDialog
                    titleLabel="A Pointless Dialog"
                    isOpen={!!openDialog}
                    closeFn={() => setOpenDialog(false)}
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
                        closeFn={() => setOpenDialog(false)}
                        closeLabel="Don't do it!"
                        isDisabled={!pointlessInput}
                    />
                </PanDialog>
            </Grid2>

        </Grid2>

    </>

}