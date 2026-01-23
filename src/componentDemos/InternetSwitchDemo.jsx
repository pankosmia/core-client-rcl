import InternetSwitch from '../rcl/InternetSwitch';
import {useContext} from "react";
import netContext from "../rcl/contexts/netContext";
import debugContext from "../rcl/contexts/debugContext";
import i18nContext from "../rcl/contexts/i18nContext";

function InternetSwitchDemo() {
    const {enabledRef} = useContext(netContext);
    const {i18nRef} = useContext(i18nContext);
    const {debugRef} = useContext(debugContext);

    return <InternetSwitch
        i18n={i18nRef.current}
        netEnabled={enabledRef.current}
        debug={debugRef.current}
        />
}

export default InternetSwitchDemo;