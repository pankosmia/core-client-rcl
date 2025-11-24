import { AppBar, Dialog, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { i18nContext, doI18n } from "pithekos-lib";
import { useContext } from "react";
import PanDialogActions from "./PanDialogActions";
import PanDialogContent from "./PanDialogContent";

export default function PanDialog({ open, closeFn,children,createButtonDisabled=false }) {
    const { i18nRef } = useContext(i18nContext);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return <Dialog
        open={open}
        fullScreen={fullScreen}
        
        onClose={closeFn}
        slotProps={{
            paper: {
                component: 'form',
            },
        }}
    >
        <AppBar color='secondary' sx={{ position: 'relative', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
            <Toolbar>
                <Typography variant="h6" component="div">
                {doI18n("pages:core-client-rcl:label", i18nRef.current)}
                </Typography>
            </Toolbar>
        </AppBar>
        <PanDialogContent>
            {children}
        </PanDialogContent>
        <PanDialogActions closeFn={closeFn} createButtonDisabled={createButtonDisabled} />
    </Dialog>;
}
