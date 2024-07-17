import React from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/workspace/components/WorkspaceRecentHome";
import ApiStatusStatistics from "./homestatistics/ApiStatusStatistics";
import ApiNewCreateStatistics from "./homestatistics/ApiNewCreateStatistics";
import {Space} from "antd";

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
                            {/*<svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                            {/*    <use xlinkHref= {`#icon-zuijinfangwen-`} />*/}
                            {/*</svg>*/}
                            <span>常用空间</span>
                        </div>
                    </div>
                    <div className={"home-box-item-detail"}>
                        <WorkspaceRecentHome {...props}/>
                    </div>
                </div>
                {/*<div className={"home-box-item-dynamic"}>*/}
                {/*    <div className={"home-item-title-box"}>*/}
                {/*        <div className={"home-item-title"}>*/}
                {/*            <svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                {/*                <use xlinkHref= {`#icon-rizhijilu`} />*/}
                {/*            </svg>*/}
                {/*            <span>常用接口</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div style={{"padding":" 0 20px"}}>*/}
                {/*        <ApiRecentHome {...props}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={"home-box-item-dynamic"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            {/*<svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                            {/*    <use xlinkHref= {`#icon-rizhijilu`} />*/}
                            {/*</svg>*/}
                            <span>接口统计</span>
                        </div>
                    </div>
                    <Space size={"large"}>
                        <div className={"home-statistics-box"}>
                            <ApiStatusStatistics />
                        </div>
                        <div className={"home-statistics-box"}>
                            <ApiNewCreateStatistics />
                        </div>
                    </Space>

                </div>
            </div>
        </div>
    )
}

export default Home;
