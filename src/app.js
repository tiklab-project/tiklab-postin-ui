import React from 'react';
import { renderRoutes  } from "react-router-config";
import "antd/dist/antd.css"
import './common/styles/base.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";

 const App = (props) => {
     const {routers} = props;

     return(
         <>
             {
                 renderRoutes(routers)
             }
         </>
    )
}

export default App;
