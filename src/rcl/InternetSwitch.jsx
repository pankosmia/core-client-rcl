import React from 'react';
import {
    Box, Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import AirplanemodeInactiveOutlinedIcon from '@mui/icons-material/AirplanemodeInactiveOutlined';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';


export default function InternetSwitch({internetState, enableInternet, handleInternetToggleClick, internetDialogOpen, setInternetDialogOpen}) {

    // const {i18nRef} = useContext(i18nContext);
    // const {enabledRef} = useContext(netContext);
    const doI18n = s => s;
    const i18nRef = {current: ""}

    const handleClose = () => {
        setInternetDialogOpen(false);
    };

    return (
        <Box>
            <Chip
                icon={internetState ? <AirplanemodeInactiveOutlinedIcon /> : <AirplanemodeActiveOutlinedIcon />}
                label={doI18n("components:header:offline_mode", i18nRef.current)}
                onClick={handleInternetToggleClick}
                color={internetState ? "appbar-chip-inactive" : "secondary"}
                variant="Filled"
            />
            <Dialog
                open={internetDialogOpen}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',

                    },
                }}
            >
                <DialogTitle><b>{doI18n("components:header:internet_question_label", i18nRef.current)}</b></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            {doI18n("components:header:internet_question", i18nRef.current)}tra la la
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{doI18n("components:header:cancel", i18nRef.current)}</Button>
                    <Button onClick={() => {
                        enableInternet();
                        handleClose();
                    }}>{doI18n("components:header:accept", i18nRef.current)}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}