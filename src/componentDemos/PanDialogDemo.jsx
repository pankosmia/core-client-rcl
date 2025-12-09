import {useState} from "react";
import PanDialog from "../rcl/PanDialog";
import PanDialogActions from "../rcl/PanDialogActions";
import {Button, DialogContent, DialogContentText, Checkbox, FormControlLabel, FormGroup} from "@mui/material";

export default function PanDialogDemo() {
    const [openDialog, setOpenDialog] = useState(null);
    const [pointlessInput, setPointlessInput] = useState(false);

    const actionFn = () => alert("Doing it!!!");

    return <>
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
                                        input: {'aria-label': 'pointless-dialog-input'},
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
    </>

}