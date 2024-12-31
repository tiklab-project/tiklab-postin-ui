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
import { stores } from './stores';
import routers from './routers';
import {enableAxios} from "tiklab-core-ui"
import App from "./app";
import {InitInstallProvider} from 'tiklab-eam-ui';

enableAxios();
export const Entry = (props) => {

    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
    }

    return (
        <InitInstallProvider bgroup={'postin'}>
            <Provider {...allStore} >
                <HashRouter>
                    <App routers={routers}/>
                </HashRouter>
            </Provider>
        </InitInstallProvider>
    )
}

ReactDOM.render(<Entry/>,document.getElementById('container'));


