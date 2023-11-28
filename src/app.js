import React, {useEffect, useState} from 'react';
import { renderRoutes  } from "react-router-config";
import {useTranslation} from "react-i18next";
import { PluginProvider,pluginLoader} from 'tiklab-plugin-core-ui';

import resources from "./common/language/resource";
import {Axios} from "tiklab-core-ui";

const App = (props) => {
     const {routers} = props;

     const {i18n} = useTranslation();

     const [pluginData,setPluginData] = useState({
         routes:routers,
         pluginStore:[],
         languageStore:[]
     });


    useEffect( async () => {
        // let res = await Axios.get("/http/findServerUrl")
        // let serverUrl=res.data

        pluginLoader( routers, resources,i18n,fetchMethod).then(res => {
            setPluginData(res)
        })
    }, []);

    return(
         <PluginProvider store={pluginData}>
             {
                 renderRoutes(pluginData.routes)
             }
         </PluginProvider>
    )
}

export default App;
