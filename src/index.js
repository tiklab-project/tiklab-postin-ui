/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */

import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { orgStores } from 'thoughtware-user-ui/es/store';
import { privilegeStores } from 'thoughtware-privilege-ui/es/store';
import { stores } from './stores';
import routers from './routers';
import {enableAxiosCE} from "thoughtware-core-ui"
import App from "./app";
import "./assets/index"

enableAxiosCE();

export const Entry = (props) => {

    let allStore = {
        ...stores,
        ...privilegeStores,
        ...orgStores,
    }

    return (
        <Provider {...allStore} >
            <HashRouter>
                <App routers={routers}/>
            </HashRouter>
        </Provider>
    )
}



ReactDOM.render(<Entry/>,document.getElementById('container'));


