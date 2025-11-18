import DrawerComponent from '../rcl/DrawerComponent';
import {useContext, useState, useEffect} from "react";
import {debugContext, getJson} from "pithekos-lib";


function DrawerDemo() {

    const {debugRef} = useContext(debugContext);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(true);

    useEffect(
        () => {
            const doFetch = async () => {
                const fetched = await getJson("/list-clients", debugRef.current);
                if (fetched.ok) {
                    setMenuItems(
                        fetched.json.filter(
                            i => !i.exclude_from_menu && (debugRef.current || !i.requires.debug)
                        )
                    );
                }
            };
            doFetch().then();
        },
        [debugRef.current]
    );

    const toggleDebug = (ev) => {
        getJson(`/debug/${debugRef.current ? "disable" : "enable"}`)
            .then(
                () => {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            );
    };

    console.log(menuItems);

    return <DrawerComponent
            /* enableInternet={enableInternet}
            handleInternetToggleClick={handleInternetToggleClick}
            internetDialogOpen={internetDialogOpen}
            setInternetDialogOpen={setInternetDialogOpen} */
            drawerIsOpen={drawerIsOpen}
            setDrawerIsOpen={setDrawerIsOpen}
            menuItems={menuItems}
            toggleDebug={toggleDebug}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
        />
}

export default DrawerDemo;