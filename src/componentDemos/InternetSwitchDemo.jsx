import InternetSwitch from '../rcl/InternetSwitch';
import {useContext} from "react";
import {i18nContext, debugContext, netContext} from "pithekos-lib";

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