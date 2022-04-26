import React, { useState, useEffect } from 'react';
import {inject, observer} from "mobx-react"
import { renderRoutes  } from "react-router-config";
import {PLUGIN_STORE, loadLanguage} from 'doublekit-plugin-manage';
import {I18nextProvider,useTranslation} from "react-i18next";
import {useVersion} from "doublekit-portal-ui"
import './common/styles/base.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import resources from "./common/language/resource";

 const App = (props) => {
     const {pluginsStore} = props;
     const { routers, isInitLoadPlugin, languages} = pluginsStore;
     const [loading, setLoading] = useState(false);
     const [resourcesLanguage,setResources] = useState({});
     const {i18n,t} = useTranslation();

     useVersion();

     useEffect(() => {
         if (isInitLoadPlugin) {
             setLoading(true);
             loadLanguage(i18n, resources, languages, "post", 'zh').then(res => {
                 if (res){
                     const resourceList = {
                        // en:res.en,
                         zh:res.zh
                     }
                     setResources(resourceList);
                 }else {
                     setResources(resources)
                 }

             })
         }
     }, [isInitLoadPlugin])

     const newI18 = i18n.cloneInstance({ resources: resourcesLanguage });


     return(
         <I18nextProvider i18n={newI18}>
             {
                loading ? renderRoutes(routers) : <div>loading...</div>
             }
         </I18nextProvider>
    )
}

export default inject(PLUGIN_STORE)(observer(App))
