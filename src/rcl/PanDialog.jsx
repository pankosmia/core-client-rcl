import { AppBar, Dialog, Toolbar, Typography } from "@mui/material";
import { i18nContext, doI18n } from "pithekos-lib";
import { useContext } from "react";
import PanDialogActions from "./PanDialogActions";
import PanDialogContent from "./PanDialogContent";

export default function PanDialog({ open, closeFn,children,createButtonDisabled=false }) {
    const { i18nRef } = useContext(i18nContext);
    return <Dialog
        open={open}
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
                    {doI18n("pages:content:restore_content", i18nRef.current)}
                </Typography>

            </Toolbar>
        </AppBar>
        <PanDialogContent>
            {children}
        </PanDialogContent>
        <PanDialogActions closeFn={closeFn} createButtonDisabled={createButtonDisabled} />
    </Dialog>;
}
