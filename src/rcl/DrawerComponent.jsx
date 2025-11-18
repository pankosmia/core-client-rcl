import React, {useContext} from 'react';
import {
    Box,
    Drawer,
    Stack,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemText,
    Switch,
    Collapse
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {i18nContext, netContext, debugContext, doI18n} from "pithekos-lib";


export default function DrawerComponent({drawerIsOpen, setDrawerIsOpen, menuItems, toggleDebug, showAdvanced, setShowAdvanced}) {

    const {i18nRef} = useContext(i18nContext);
    const {enabledRef} = useContext(netContext);
    const {debugRef} = useContext(debugContext);

    return (
        <Box sx={{m: 0, mr: 2}}>
            <IconButton onClick={e => setDrawerIsOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}
            >
                <Box sx={{width: "100%", minHeight: '98vh', m: 0, p: 0}} role="presentation">                         
                    <List sx={{ height: '100%', width: '100%' }}>
                        <Stack
                            direction="column"
                            spacing={0}
                            sx={{
                                height: '100%',
                                width: '100%',
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                            }}
                        > 
                            <Box sx={{width: '100%'}}>
                                {
                                    menuItems
                                    .map(
                                        (mi, n) => /* mi.id === currentId ?
                                            <ListItem key={n} disablePadding onClick={() => setDrawerIsOpen(false)}>
                                                <ListItemButton selected={true} >
                                                    <ListItemText
                                                        primary={doI18n(`pages:${mi.id}:title`, i18nRef.current)}/>
                                                </ListItemButton>
                                            </ListItem> : */
                                            <ListItem key={n} disablePadding>
                                                <ListItemButton
                                                    disabled={mi.requires.net && !enabledRef.current}
                                                    onClick={() => {
                                                        window.location.href = mi.url
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={doI18n(`pages:${mi.id}:title`, i18nRef.current)}/>
                                                </ListItemButton>
                                            </ListItem>
                                    )
                                }
                            </Box>
                            <Box>
                                <ListItem disablePadding >
                                    <ListItemButton 
                                        /* selected={currentId.includes("settings")}  */
                                        onClick={ () => { window.location.href = "/clients/settings" }} 
                                    >
                                        <ListItemText primary={doI18n("pages:core-settings:title", i18nRef.current)}/>
                                    </ListItemButton> 
                                </ListItem>
                                <ListItem disablePadding >
                                    <ListItemButton onClick={() => setShowAdvanced(a => !a)} >
                                        <ListItemText primary={doI18n(`components:header:advanced`, i18nRef.current)}/>
                                        {showAdvanced ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={showAdvanced} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton onClick={toggleDebug} sx={{ pl:4 }}>
                                            <ListItemText primary={doI18n(`components:header:experimental_mode`, i18nRef.current)} />
                                            <Switch
                                                edge="end"
                                                onChange={toggleDebug}
                                                checked={debugRef.current}
                                            />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </Box>
                        </Stack>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}