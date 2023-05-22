import React, {useEffect} from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/workspace/components/WorkspaceRecentHome";
import DynamicWidget from "./DynamicWidget";
import {RightOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import ApiRecentHome from "../api/apix/components/ApiRecentHome";

/**
 * 首页
 */
const Home =(props)=> {
    const {workspaceStore} = props;
    const {findWorkspaceJoinList} = workspaceStore;

    useEffect(()=>{
        findWorkspaceJoinList({userId: getUser().userId})
    },[])

    /**
     * 去往动态详情页
     */
    const changeDynamic =() =>{
        props.history.push("/dynamic")
    }

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
                        {/*<RightOutlined onClick={changeDynamic} />*/}
                    </div>
                    <div style={{"padding":" 0 20px"}}>
                        <ApiRecentHome {...props}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(Home));
