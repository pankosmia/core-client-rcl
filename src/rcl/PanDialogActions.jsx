import { DialogActions } from "@mui/material";
import PanDialogButton from "./PanDialogInternals/PanDialogButton";

export default function PanDialogActions ({actionFn, actionLabel, closeFn, closeLabel, isDisabled}) {
    return <DialogActions>
        <PanDialogButton actionFn={closeFn} isDisabled={false} label={closeLabel}/>
        <PanDialogButton actionFn={() => {actionFn();}} isDisabled={isDisabled} label={actionLabel}/>
        </DialogActions>
}
