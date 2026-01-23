import {createRoot} from "react-dom/client";
import {SpSpa} from "./rcl"
import App from "./App";
import './index.css';

createRoot(document.getElementById("root"))
    .render(
        <SpSpa
            requireNet={false}
            titleKey="pages:core-client-rcl:title"
            currentId="core-client-rcl"
        >
            <App/>
        </SpSpa>
    );
