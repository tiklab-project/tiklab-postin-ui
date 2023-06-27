/*
 * @Description: 入口
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:43:26
 */

import ReactDOM from 'react-dom';
import React,{Suspense} from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { orgStores } from 'tiklab-user-ui/es/store';
import { privilegeStores } from 'tiklab-privilege-ui/es/store';
import { stores } from './stores';
import routers from './routers';
import {enableAxiosCE} from "tiklab-core-ui"
import App from "./app";
import "./assets/index"
import {Spin} from "antd";

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

const Main = () =>{
    return(
        <Suspense fallback={
            <div style={{
                "height":"100%",
                "display":"flex",
                "justifyContent":"center",
                "alignItems":"center"
            }}>
                <Spin size="large"/>
            </div>
        }>
            <Entry />
        </Suspense>
    )
}


ReactDOM.render(<Main/>,document.getElementById('container'));


