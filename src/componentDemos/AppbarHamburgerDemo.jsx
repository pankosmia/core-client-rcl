import AppbarHamburger from '../rcl/AppbarHamburger';
import {useContext} from "react";
import {debugContext, i18nContext, netContext} from "pithekos-lib";


function AppbarHamburgerDemo() {

    const {debugRef} = useContext(debugContext);
    const {i18nRef} = useContext(i18nContext);
    const {enabledRef} = useContext(netContext);

    return <AppbarHamburger
        i18n={i18nRef.current}
        netEnabled={enabledRef.current}
        debug={debugRef.current}
        />
}

export default AppbarHamburgerDemo;