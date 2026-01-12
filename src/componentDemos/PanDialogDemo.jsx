import { useState } from "react";
import PanDialog from "../rcl/PanDialog";
import PanDialogActions from "../rcl/PanDialogActions";
import { Button, DialogContent, DialogContentText, Checkbox, FormControlLabel, FormGroup, Grid2, Switch } from "@mui/material";

export default function PanDialogDemo() {
    const [openDialog1, setOpenDialog1] = useState(null);
    const [openDialog2, setOpenDialog2] = useState(null);
    const [openDialog3, setOpenDialog3] = useState(null);

    const [pointlessInput, setPointlessInput] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);

    const actionFn = () => console.log("Doing it!!!");

    return <>
        <Grid2 container spacing={8} minHeight={600}>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog1(event.target)
                }}> Test closeOnAction dialog </Button>
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
                    />
                </PanDialog>
            </Grid2>
        </Grid2>

    </>

}