import React, {useEffect, useState} from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/components/workspaceRecentHome";

import DynamicWidget from "./dynamicWidget";

import {RightOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

// 首页
const Home =(props)=> {
    const {workspaceStore} = props;
    const {findWorkspaceJoinList} = workspaceStore;

    const changeDynamic =() =>{
        props.history.push("/dynamic")
    }

    useEffect(()=>{
        findWorkspaceJoinList({userId: getUser().userId})
    },[])



    return(
        <div className={"home-content"}>
            <div className={"home-content-box"}>
                <div className={"home-box-item"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-zuijinfangwen-`} />
                            </svg>
                            <span>最近访问</span>
                        </div>
                    </div>
                    <div className={"home-box-item-detail"}>
                        <WorkspaceRecentHome {...props}/>
                    </div>
                </div>
                {/*<div className={"home-box-item"}>*/}
                {/*    <div className={"home-item-title-box"}>*/}
                {/*        <div className={"home-item-title"}>*/}
                {/*            <svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                {/*                <use xlinkHref= {`#icon-daibanshixiang`} />*/}
                {/*            </svg>*/}
                {/*            <span>代办信息</span>*/}
                {/*        </div>*/}
                {/*        <RightOutlined onClick={changeTodo} />*/}
                {/*    </div>*/}
                {/*    <div  className={"home-box-item-detail"}>*/}
                {/*        <Empty*/}
                {/*            image={emptyImg}*/}
                {/*            imageStyle={{  height: 60 }}*/}
                {/*            description={*/}
                {/*                <span>暂无代办</span>*/}
                {/*            }*/}
                {/*        >*/}
                {/*        </Empty>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"home-box-item-dynamic"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-rizhijilu`} />
                            </svg>
                            <span>动态信息</span>
                        </div>
                        <RightOutlined onClick={changeDynamic} />
                    </div>
                    <div style={{"padding":" 0 20px"}}>
                        <DynamicWidget />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(Home));
