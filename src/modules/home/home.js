import React, { useState} from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/components/workspaceRecentHome";
import {Empty} from "antd";
import DynamicWidget from "./dynamicWidget";
import emptyImg from "../../assets/img/empty.png"

import {RightOutlined} from "@ant-design/icons";

// 首页
const Home =(props)=> {


    const changeTodo =() =>{
        props.history.push("/dynamic")
    }

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
                            <apan>动态信息</apan>
                        </div>
                        <RightOutlined onClick={changeDynamic} />
                    </div>
                    <div style={{"padding":" 0 20px"}}>
                        <DynamicWidget/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
