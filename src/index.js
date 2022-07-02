/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { orgStores } from 'doublekit-user-ui';
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui'
import { stores } from './stores';
import routers from './routers';

import {useVersion} from "doublekit-eam-ui";
import App from "./app";

export const Entry = (props) => {

    useVersion();

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


