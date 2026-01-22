import { DialogActions } from "@mui/material";
import PanDialogButton from "./PanDialogInternals/PanDialogButton";

export default function PanDialogActions({ actionFn, actionLabel, closeFn, closeLabel, isDisabled, closeOnAction = true, onlyCloseButton = false }) {
    return <DialogActions>
        <PanDialogButton actionFn={closeFn} isDisabled={false} label={closeLabel} />
        {onlyCloseButton ? null : <PanDialogButton actionFn={() => {
            actionFn();
            if (closeOnAction) { closeFn() };

        }} isDisabled={isDisabled} label={actionLabel}/>}

    </DialogActions>
}
