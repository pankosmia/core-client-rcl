import React, {useContext} from 'react';
import {
    Box,
    Fab,
} from "@mui/material";

import {i18nContext, doI18n} from "pithekos-lib";


export default function FabComponent({setFabAnchorEl }) {
    const {i18nRef} = useContext(i18nContext);

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