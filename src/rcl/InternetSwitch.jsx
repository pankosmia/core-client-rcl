import React, {useState} from 'react';
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
import {doI18n, postEmptyJson} from 'pithekos-lib';


export default function InternetSwitch({i18n, netEnabled, debug=false}) {

    const [internetDialogOpen, setInternetDialogOpen] = useState(false);
    const handleCloseDialog = () => {
        setInternetDialogOpen(false);
    };

    const disableInternet = () => {
        postEmptyJson('/net/disable', debug)
    };

    const enableInternet = () => {
        postEmptyJson('/net/enable', debug)
    };
    const handleInternetToggleClick = () => {
        if (!netEnabled) {
            setInternetDialogOpen(true);
        } else {
            disableInternet();
        }
    };

    return (
        <Box>
            <Chip
                icon={netEnabled ? <AirplanemodeInactiveOutlinedIcon /> : <AirplanemodeActiveOutlinedIcon />}
                label={doI18n("components:header:offline_mode", i18n)}
                onClick={handleInternetToggleClick}
                color={netEnabled ? "appbar-chip-inactive" : "secondary"}
                variant="Filled"
            />
            <Dialog
                open={internetDialogOpen}
                onClose={handleCloseDialog}
                slotProps={{
                    paper: {
                        component: 'form',

                    },
                }}
            >
                <DialogTitle><b>{doI18n("components:header:internet_question_label", i18n)}</b></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            {doI18n("components:header:internet_question", i18n)}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>{doI18n("components:header:cancel", i18n)}</Button>
                    <Button onClick={() => {
                        enableInternet();
                        handleCloseDialog();
                    }}>{doI18n("components:header:accept", i18n)}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}