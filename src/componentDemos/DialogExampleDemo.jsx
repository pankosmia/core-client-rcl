import { useState } from "react";
import PanDialog from "../../rclStash/PanDialog";
import { Button } from "@mui/material";

export default function DialogExampleDemo() {
    const [openDialog, setOpenDialog] = useState(null);
    const contentOpenDialog = Boolean(openDialog)

    return <>
        <Button onClick={(event) => {
            setOpenDialog(event.target)
        }}> open dialog </Button>
        <PanDialog open={contentOpenDialog} closeFn={() => setOpenDialog(false)} >test</PanDialog>
    </>

}