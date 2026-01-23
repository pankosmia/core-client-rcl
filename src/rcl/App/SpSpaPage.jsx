import React, {useContext} from "react";
import {Box, Grid2} from "@mui/material";
import BlockOutlined from "@mui/icons-material/BlockOutlined";
import Header from "../Header/Header";
import { i18nContext,netContext,doI18n } from "pithekos-lib";

function SpSpaPage({titleKey, widget, margin = 0, children, requireNet = false, currentId}) {
    const {enableNet} = useContext(netContext);
    const i18n = useContext(i18nContext);
    if (requireNet && !enableNet) {
        return (<Box sx={{
                m: margin,
                height: "100%",
                overflowX: "hidden",
                overflowY: "auto",
            }}>
                <Grid2 container spacing={0} direction="column" alignItems="center" justifyContent="center"
                       sx={{minHeight: '100vh'}}>
                    <Grid2 item>
                        <Box>
                            <BlockOutlined fontSize="large" color="warning"/>
                            <p>{doI18n("components:framework:no_entry_if_offline", i18n)}</p>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        );
    }
    return (<>
            <Box>
                <Header
                    titleKey={titleKey || null}
                    widget={widget || null}
                    currentId={currentId}
                />
            </Box>
            <Box sx={{
                m: margin,
                overflowX: "hidden",
                overflowY: "auto",
            }}>
                {children}
            </Box>
        </>
    );
}

export default SpSpaPage;
