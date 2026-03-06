import React, { useContext } from "react";
import { Box, Grid2 } from "@mui/material";
import BlockOutlined from "@mui/icons-material/BlockOutlined";
import Header from "../Header/Header";
import { doI18n } from "pithekos-lib";
import netContext from "../contexts/netContext";
import i18nContext from "../contexts/i18nContext";

function SpSpaPage({ titleKey, widget, margin = 0, children, requireNet = false, currentId }) {
    const { enableNet } = useContext(netContext);
    const { i18nRef } = useContext(i18nContext);

    if (requireNet && !enableNet) {
        return (<Box sx={{
            m: 0,
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
        }}>
            <Grid2
                container
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid2
                    item
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    rowSpacing={0.5}
                >
                   <BlockOutlined sx={{fontSize:80}} color="warning" />
                    <p>{doI18n("components:framework:no_entry_if_offline", i18nRef.current)}</p>
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
