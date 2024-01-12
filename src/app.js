import React, {useEffect, useState} from 'react';
import { renderRoutes  } from "react-router-config";
import {useTranslation} from "react-i18next";
import { PluginProvider,pluginLoader} from 'thoughtware-plugin-core-ui';

import resources from "./common/language/resource";

const App = (props) => {
     const {routers} = props;

     const {i18n} = useTranslation();

    const [initPluginData,setPluginData] = useState({
        routers,
        pluginStore:[],
        languageStore:[]
    })

    useEffect( async () => {
        pluginLoader( routers, resources,i18n,"post").then(res => {
            setPluginData(res)
        })
    }, []);

    return(
         <PluginProvider store={initPluginData}>
             {
                 renderRoutes(initPluginData.routes)
             }
         </PluginProvider>
    )
}

export default App;
