import { DialogActions } from "@mui/material";
import PanDialogButton from "./PanDialogButton";

export default function PanDialogActions ({closeFn,createButtonDisabled}) {
    return <>
        <DialogActions>
           <PanDialogButton closeFn={closeFn} createButtonDisabled={createButtonDisabled}/>
        </DialogActions>
    </>

}
