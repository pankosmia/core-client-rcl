import { DialogActions } from "@mui/material";
import PanDialogButton from "./PanDialogInternals/PanDialogButton";
/**
 * Action bar for dialogs with configurable action and close buttons.
 *
 * Renders a mandatory close button and an optional action button.
 * The action button can automatically close the dialog after execution.
 *
 * @param {Object} props Component properties
 * @param {() => void} props.actionFn
 *   Function executed when the action button is clicked.
 * @param {string} props.actionLabel
 *   Label displayed on the action button.
 * @param {() => void} props.closeFn
 *   Function executed when the close button is clicked.
 * @param {string} props.closeLabel
 *   Label displayed on the close button.
 * @param {boolean} [props.isDisabled]
 *   Disables the action button when true.
 * @param {boolean} [props.closeOnAction=true]
 *   Whether the dialog should close automatically after the action executes.
 * @param {boolean} [props.onlyCloseButton=false]
 *   When true, only the close button is rendered.
 */
export default function PanDialogActions({ actionFn, actionLabel, closeFn, closeLabel, isDisabled, closeOnAction = true, onlyCloseButton = false }) {
    return <DialogActions>
        <PanDialogButton actionFn={closeFn} isDisabled={false} label={closeLabel} />
        {onlyCloseButton ? null : <PanDialogButton actionFn={() => {
            actionFn();
            if (closeOnAction) { closeFn() };

        }} isDisabled={isDisabled} label={actionLabel}/>}

    </DialogActions>
}
