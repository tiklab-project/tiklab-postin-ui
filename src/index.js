/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */

import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { orgStores } from 'tiklab-user-ui/es/store';
import { privilegeStores } from 'tiklab-privilege-ui/es/store';
import { messageModuleStores } from 'tiklab-message-ui/es/store';
import { stores } from './stores';
import routers from './routers';
import  enableAxiosCE from "tiklab-enable-axios-ce"
import App from "./app";

enableAxiosCE();

export const Entry = (props) => {

    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
        ...messageModuleStores,
    }

    return (
        <Provider {...allStore} >
            <HashRouter>
                <App
                    allStore={allStore}
                    routers={routers}
                />
            </HashRouter>
        </Provider>
    )
}

ReactDOM.render(<Entry/>,document.getElementById('container'));


