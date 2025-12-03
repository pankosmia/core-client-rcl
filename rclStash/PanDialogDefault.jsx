import { AppBar, Dialog, Toolbar, Typography } from "@mui/material";
import { i18nContext, doI18n } from "pithekos-lib";
import { useContext } from "react";
import PanDialogActions from "./PanDialogActions";
import PanDialogContent from "./PanDialogContent";
import PanDialog from "./PanDialog";

export default function PanDialogDefault({ open, closeFn,children,createButtonDisabled=false }) {
    
    return <PanDialog>
        <PanDialogContent>
            {children}
        </PanDialogContent>
        <PanDialogActions closeFn={closeFn} createButtonDisabled={createButtonDisabled} />
    </PanDialog>;
}
