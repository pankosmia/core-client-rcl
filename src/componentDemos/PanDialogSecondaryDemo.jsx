import { useState } from "react";
import PanDialogActions from "../rcl/PanDialogActions";
import { Button, DialogContent, DialogContentText, FormControlLabel, FormGroup, Grid2, Switch } from "@mui/material";
import { PanDialogOneAction } from "../rcl";


export default function PanDialogOneActionDemo() {
    const [openDialog1, setOpenDialog1] = useState(null);
    const [openDialog2, setOpenDialog2] = useState(null);

    const actionFn = () => console.log("Doing it!!!");

    return <>
        <Grid2 container spacing={8} minHeight={600}>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog1(event.target)
                }}> Test dialog </Button>
                <PanDialogOneAction
                    titleLabel="Archive"
                    isOpen={!!openDialog1}
                    closeFn={() => setOpenDialog1(false)}
                >
                    <DialogContent>
                        <DialogContentText>
                            Text within dialog content goes within DialogContentText.
                        </DialogContentText>
                    </DialogContent>
                    <PanDialogActions
                        actionFn={actionFn}
                        actionLabel="Do it!"
                        closeFn={() => setOpenDialog1(false)}
                        closeLabel="Don't do it!"
                        closeOnAction={false}
                    />
                </PanDialogOneAction>
            </Grid2>
            <Grid2 item size={4}>
                <Button onClick={(event) => {
                    setOpenDialog2(event.target)
                }}> Test fullWidth dialog </Button>
                <PanDialogOneAction
                    titleLabel="Archive"
                    isOpen={!!openDialog2}
                    closeFn={() => setOpenDialog2(false)}
                    fullWidth={true}
                >
                    <DialogContent>
                        <DialogContentText>
                            Text within dialog content goes within DialogContentText.
                        </DialogContentText>
                    </DialogContent>
                    <PanDialogActions
                        actionFn={actionFn}
                        actionLabel="Do it!"
                        closeFn={() => setOpenDialog2(false)}
                        closeLabel="Don't do it!"
                        closeOnAction={false}
                    />
                </PanDialogOneAction>
            </Grid2>
        </Grid2>

    </>

}