import {createContext} from 'react';

const ClientConfigContext = createContext({clientConfig: {}, setClientConfig: ()=>{}});

export default ClientConfigContext;