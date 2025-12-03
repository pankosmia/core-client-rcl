import { DialogContent, DialogContentText, Typography } from "@mui/material";
import { i18nContext, doI18n } from "pithekos-lib";
import { useContext } from "react";
export default function PanDialogContent({children}) {
    const { i18nRef } = useContext(i18nContext);
    return <>
        <DialogContent>
            <DialogContentText>
                {children}
            </DialogContentText>
        </DialogContent>
    </>
}