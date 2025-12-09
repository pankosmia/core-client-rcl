import React, {useEffect, useState} from 'react';
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

import {doI18n, getJson} from "pithekos-lib";

export default function AppbarHamburger({i18n, netEnabled, debug}) {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(
        () => {
            const doFetch = async () => {
                const fetched = await getJson("/list-clients", debug);
                if (fetched.ok) {
                    setMenuItems(
                        fetched.json.filter(
                            i => !i.exclude_from_menu && (debug || !i.requires.debug)
                        )
                    );
                }
            };
            doFetch().then();
        },
        [debug]
    );

    const toggleDebug = (ev) => {
        getJson(`/debug/${debug} ? "disable" : "enable"}`)
            .then(
                () => {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            );
    };

    return (
        <Box sx={{m: 0, mr: 2}}>
            <IconButton onClick={e => setDrawerIsOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                open={drawerIsOpen} 
                onClose={() => setDrawerIsOpen(false)} 
                slotProps={{ paper: { sx: { width: "auto", overflow: 'hidden' } } }}
            >
                <Box sx={{width: "100%", minHeight: '98vh', minWidth: "20vw", m: 0, p: 0}} role="presentation">
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
                                        (mi, n) => <ListItem key={n} disablePadding>
                                                <ListItemButton
                                                    disabled={mi.requires.net && !netEnabled.current}
                                                    onClick={() => {
                                                        window.location.href = mi.url
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={doI18n(`pages:${mi.id}:title`, i18n)}/>
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
                                        <ListItemText primary={doI18n("pages:core-settings:title", i18n)}/>
                                    </ListItemButton> 
                                </ListItem>
                                <ListItem sx={{width: "auto"}} disablePadding>
                                    <ListItemButton onClick={() => setShowAdvanced(a => !a)}>
                                        <ListItemText primary={doI18n(`components:header:advanced`, i18n)} />
                                        {showAdvanced ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={showAdvanced} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton onClick={toggleDebug} sx={{ pl:4 }}>
                                            <ListItemText primary={doI18n(`components:header:experimental_mode`, i18n)} />
                                            <Switch
                                                edge="end"
                                                onChange={toggleDebug}
                                                checked={debug}
                                            />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                                <Box
                                    // ref={measurementRef}
                                    sx={{
                                        visibility: 'hidden', 
                                        position: 'absolute', 
                                        whiteSpace: 'nowrap',
                                        top: 0,
                                        left: 0,
                                    }}
                                >
                                    <List component="div" disablePadding>
                                        <ListItemButton onClick={toggleDebug} sx={{ pl:4 }}>
                                            <ListItemText primary={doI18n(`components:header:experimental_mode`, i18n)} />
                                            <Switch
                                                edge="end"
                                                onChange={toggleDebug}
                                                checked={debug}
                                            />
                                        </ListItemButton>
                                    </List>
                                </Box>
                            </Box>
                        </Stack>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}