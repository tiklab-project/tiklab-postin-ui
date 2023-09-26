import React from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/workspace/components/WorkspaceRecentHome";
import ApiRecentHome from "./apiRecent/components/ApiRecentHome";
import {Row,Col} from "antd";

/**
 * 首页
 */
const Home =(props)=> {

    return(
        <div className={"home-content"}>
            <div className={"home-content-box"}>
                <div className={"home-box-item"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-zuijinfangwen-`} />
                            </svg>
                            <span>最近空间访问</span>
                        </div>
                    </div>
                    <div className={"home-box-item-detail"}>
                        <WorkspaceRecentHome {...props}/>
                    </div>
                </div>
                <div className={"home-box-item-dynamic"}>
                        <div className={"home-item-title-box"}>
                            <div className={"home-item-title"}>
                                <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-rizhijilu`} />
                                </svg>
                                <span>最近接口访问</span>
                            </div>
                        </div>
                        <div style={{"padding":" 0 20px"}}>
                            <ApiRecentHome {...props}/>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default Home;
