import React from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/workspace/components/WorkspaceRecentHome";
import ApiStatusStatistics from "./homestatistics/ApiStatusStatistics";
import ApiNewCreateStatistics from "./homestatistics/ApiNewCreateStatistics";
import PageCenter from "../common/pageCenter/PageCenter";

/**
 * 首页
 */
const Home =(props)=> {

    return(
        <div className={"home-content"}>
            <PageCenter>
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
                    <WorkspaceRecentHome {...props}/>
                </div>
                <div className={"home-box-item-dynamic"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            {/*<svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                            {/*    <use xlinkHref= {`#icon-rizhijilu`} />*/}
                            {/*</svg>*/}
                            <span>接口统计</span>
                        </div>
                    </div>
                    <div style={{width:"100%",display:'flex',gap:"20px"}}>
                        <div className={"home-statistics-box"}>
                            <ApiStatusStatistics />
                        </div>
                        <div className={"home-statistics-box"}>
                            <ApiNewCreateStatistics />
                        </div>
                    </div>

                </div>
            </div>
            </PageCenter>
        </div>
    )
}

export default Home;
