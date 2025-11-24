import PanDialogActions from "./PanDialogActions";
import PanDialogContent from "./PanDialogContent";
import PanDialog from "./PanDialog";

export default function PanDialogDefault({closeFn,children,createButtonDisabled=false }) {
    
    return <PanDialog>
        <PanDialogContent>
            {children}
        </PanDialogContent>
        <PanDialogActions closeFn={closeFn} createButtonDisabled={createButtonDisabled} />
    </PanDialog>;
}
