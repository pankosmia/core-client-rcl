import { useContext, useState } from "react";
import PanDialog from "../rcl/PanDialog";
import { Button } from "@mui/material";
import {i18nContext, doI18n} from "pithekos-lib";

export default function DialogExampleDemo() {
    const [openDialog, setOpenDialog] = useState(null);
    const contentOpenDialog = Boolean(openDialog)
        const {i18nRef} = useContext(i18nContext);
    
    return <>
        <Button onClick={(event) => {
            setOpenDialog(event.target)
        }}> open dialog </Button>
        <PanDialog open={contentOpenDialog} closeFn={() => setOpenDialog(false)} >
            {doI18n("pages:core-client-rcl:label", i18nRef.current)}
        </PanDialog>
    </>

}