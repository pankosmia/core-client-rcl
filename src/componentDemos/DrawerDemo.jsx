import DrawerComponent from '../rcl/DrawerComponent';
import {useContext, useState, useEffect, useRef} from "react";
import {debugContext, getJson} from "pithekos-lib";

function DrawerDemo() {
    const {debugRef} = useContext(debugContext);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [showAdvanced, setShowAdvanced] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState('auto');
    const [widthLocked, setWidthLocked] = useState(false);
    const measurementRef = useRef(null);

    useEffect(() => {
        let timeoutId;
        if (drawerIsOpen && !widthLocked) {
          timeoutId = setTimeout(() => {
            if (measurementRef.current) {
              const width = measurementRef.current.clientWidth;
              
              if (width > 0) {
                setDrawerWidth(`${width}px`); 
                setWidthLocked(true);
              }
            }
          }, 50);
          return () => clearTimeout(timeoutId);
        }
      }, [drawerIsOpen, widthLocked]);

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

    return <DrawerComponent
            drawerIsOpen={drawerIsOpen}
            setDrawerIsOpen={setDrawerIsOpen}
            menuItems={menuItems}
            toggleDebug={toggleDebug}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
            drawerWidth={drawerWidth}
            measurementRef={measurementRef}
        />
}

export default DrawerDemo;