import {
    Box,
    Dialog,
    DialogTitle,
} from "@mui/material";

export default function PanDialogOneAction({ titleLabel, isOpen, closeFn, children, size = 'md', fullWidth=false }) {

    return (
        <Box>

            <Dialog
                open={isOpen}
                onClose={closeFn}
                slotProps={{
                    paper: {
                        component: 'form',
                    },
                }}
                fullWidth={fullWidth}
                maxWidth={size}
            >
                <DialogTitle><b>{titleLabel}</b></DialogTitle>
                {children}
            </Dialog>
        </Box>
    )
}