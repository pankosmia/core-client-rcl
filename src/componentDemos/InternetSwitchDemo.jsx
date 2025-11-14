import InternetSwitch from '../rcl/InternetSwitch';
import {useContext, useState} from "react";
import {debugContext, netContext, postEmptyJson} from "pithekos-lib";

function InternetSwitchDemo() {

    const [internetDialogOpen, setInternetDialogOpen] = useState(false);
    const {enabledRef} = useContext(netContext);
    const {debugRef} = useContext(debugContext);

    const disableInternet = () => {
        postEmptyJson('/net/disable', debugRef.current)
    };

    const enableInternet = () => {
        postEmptyJson('/net/enable', debugRef.current)
    };
    const handleInternetToggleClick = () => {
        if (!enabledRef.current) {
            setInternetDialogOpen(true);
        } else {
            disableInternet();
        }
    };

    return <>
        <h1>InternetSwitch</h1>
        <InternetSwitch
            enableInternet={enableInternet}
            handleInternetToggleClick={handleInternetToggleClick}
            internetDialogOpen={internetDialogOpen}
            setInternetDialogOpen={setInternetDialogOpen}
        />
    </>
}

export default InternetSwitchDemo;