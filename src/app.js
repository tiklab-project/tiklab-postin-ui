import React from 'react';
import { renderRoutes  } from "react-router-config";
import "./assets/index"

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
