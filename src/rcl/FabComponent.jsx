import React, {useContext, useState} from 'react';
import {
    Box,
    Drawer,
    Stack,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemText,
    Switch,
    Collapse,
    Fab,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {i18nContext, netContext, debugContext, doI18n} from "pithekos-lib";


export default function FabComponent({setFabAnchorEl }) {

    const {i18nRef} = useContext(i18nContext);
    const {enabledRef} = useContext(netContext);
    const {debugRef} = useContext(debugContext);

    return (
        <Box sx={{m: 0, mr: 2}}>
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={event => setFabAnchorEl(event.currentTarget)}
                sx={{ml: 2}}
            >
                {doI18n("pages:core-client-rcl:label", i18nRef.current)}
            </Fab>
        </Box>
    )
}