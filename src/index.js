/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { getUser } from 'doublekit-core-ui';
import {initFetch, PluginProvider} from 'doublekit-plugin-ui'
import { orgStores } from 'doublekit-user-ui';
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui'
import { stores } from './stores';
import routers from './routers';
import {useVersion} from "doublekit-eam-ui";
import resources from "./common/language/resource";
import App from "./app";
import {useTranslation} from "react-i18next";

export const Entry = (props) => {

    const {i18n,t} = useTranslation();

    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
        ...messageModuleStores,
    }

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


    useVersion();

    //获取系统权限
    const userInfo = getUser();
    if(userInfo && userInfo.userId) {
        allStore.systemRoleStore.getSystemPermissions(userInfo.userId);
    }


    if (!viable) {
        return <div>加载中</div>
    }
    console.log(i18n)
    return (
        <PluginProvider store={pluginData}>
            <Provider {...allStore} >
                <HashRouter>
                    <App routers={pluginData.routes}/>
                </HashRouter>
            </Provider>
        </PluginProvider>

    )

}

ReactDOM.render(<Entry/>,document.getElementById('container'));


