import { Button } from "@mui/material";
import { i18nContext, doI18n } from "pithekos-lib";
import { useContext } from "react";

export default function PanDialogButton ({closeFn,createButtonDisabled}) {
    const { i18nRef } = useContext(i18nContext);
    return <>
        <Button onClick={closeFn}>
            {doI18n("pages:content:cancel", i18nRef.current)}
        </Button>
        <Button
            variant='contained'
            color="primary"
            onClick={() => {
                closeFn();
            }}
            disabled={createButtonDisabled}
        >{doI18n("pages:content:accept", i18nRef.current)}</Button>
    </>
}