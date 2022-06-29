import React, { useState, useEffect } from 'react';
import { renderRoutes  } from "react-router-config";
import {I18nextProvider,useTranslation} from "react-i18next";
import "antd/dist/antd.css"
import './common/styles/base.scss';
import './common/language/i18n';
import "./assets/iconfont/iconfont";
import "./assets/iconfont/iconfont.css";


 const App = (props) => {
     const {routers} = props;

     const [loading, setLoading] = useState(false);
     const [resourcesLanguage,setResources] = useState({});
     const {i18n,t} = useTranslation();


     const newI18 = i18n.cloneInstance({ resources: resourcesLanguage });


     return(
         <I18nextProvider i18n={newI18}>
             {
                 renderRoutes(routers)
             }
         </I18nextProvider>
    )
}

export default App
