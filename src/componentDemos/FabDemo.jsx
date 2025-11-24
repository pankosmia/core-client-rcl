import FabComponent from '../rcl/FabComponent';
import {useState} from "react";

function FabDemo() {
    const [fabAnchorEl, setFabAnchorEl] = useState(null);

   
    return <FabComponent
            setFabAnchorEl={setFabAnchorEl}
        />
}

export default FabDemo;