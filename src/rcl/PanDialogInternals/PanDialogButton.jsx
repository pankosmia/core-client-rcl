import {Button} from "@mui/material";

export default function PanDialogButton({label, actionFn, isDisabled}) {
    return <Button
        onClick={actionFn}
        disabled={isDisabled}
        color="primary"
    >
        {label}
    </Button>
}