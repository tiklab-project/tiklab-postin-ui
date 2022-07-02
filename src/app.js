import React, {useEffect, useState} from 'react';
import { renderRoutes  } from "react-router-config";
import "antd/dist/antd.css"
import './common/styles/base.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";
import {useTranslation} from "react-i18next";
import {initFetch, PluginProvider} from "doublekit-plugin-ui";
import resources from "./common/language/resource";
import {getUser} from "doublekit-core-ui";


 const App = (props) => {
     const {allStore,routers} = props;

     const {i18n,t} = useTranslation();

     const [viable,setViable] = useState(false);

     const [pluginData,setPluginData] = useState({
         routes:routers,
         pluginStore:[],
         languageStore:[]
     });

     useEffect(() => {
         initFetch('post', routers, resources,i18n).then(res => {
             setPluginData(res)
             setViable(true)
         })
     }, []);


     //获取系统权限
     const userInfo = getUser();
     if(userInfo && userInfo.userId) {
         allStore.systemRoleStore.getSystemPermissions(userInfo.userId);
     }


     if (!viable) {
         return <div>加载中</div>
     }

     return(
         <PluginProvider store={pluginData}>
             {
                 renderRoutes(routers)
             }
         </PluginProvider>
    )
}

export default App;
