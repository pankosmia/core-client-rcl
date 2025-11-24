import React, { useContext } from 'react';
import {
    AppBar,
    Box, Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Toolbar,
    Typography
} from "@mui/material";
import AirplanemodeInactiveOutlinedIcon from '@mui/icons-material/AirplanemodeInactiveOutlined';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import { i18nContext, netContext, doI18n } from "pithekos-lib";


export default function InternetSwitch({ enableInternet, handleInternetToggleClick, internetDialogOpen, setInternetDialogOpen }) {

    const { i18nRef } = useContext(i18nContext);
    const { enabledRef } = useContext(netContext);
    const handleClose = () => {
        setInternetDialogOpen(false);
    };

    return (
        <Box>
            <Chip
                icon={enabledRef.current ? <AirplanemodeInactiveOutlinedIcon /> : <AirplanemodeActiveOutlinedIcon />}
                label={doI18n("components:header:offline_mode", i18nRef.current)}
                onClick={handleInternetToggleClick}
                color={enabledRef.current ? "appbar-chip-inactive" : "secondary"}
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
                <AppBar color='secondary' sx={{ position: 'relative', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                         {doI18n("components:header:internet_question_label", i18nRef.current)}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            {doI18n("components:header:internet_question", i18nRef.current)}
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