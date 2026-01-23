import AppbarHamburger from '../rcl/AppbarHamburger';
import {useContext} from "react";
import debugContext from '../rcl/contexts/debugContext';
import netContext from '../rcl/contexts/netContext';
import i18nContext from '../rcl/contexts/i18nContext';

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