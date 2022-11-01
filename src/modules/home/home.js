import React, {useEffect, useState} from 'react';
import './homestyle.scss';
import {inject, observer} from "mobx-react";
import WorkspaceRecentHome from "../workspace/components/workspaceRecentHome";
import {Empty, Space} from "antd";
import DynamicWidget from "./dynamicWidget";
import emptyImg from "../../assets/img/empty.png"

import {FullWorkTodo} from "tiklab-widget-ui"

// 首页
const Home =(props)=> {

    const [fullTodo, seFullTodo] = useState(false);

    const changeTodo =() =>{
        seFullTodo(!fullTodo)
    }

    return(
        <div className={"home-content"}>
            { !fullTodo ?
                <div className={"home-content-box"}>
                    <div className={"home-content-box-top"}>
                        <div className={"home-box-item"}>
                            <div className={"home-item-title-box"}>
                                <div className={"home-item-title"}>
                                    <svg className=" home-item-title-icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-zuijinfangwen-`} />
                                    </svg>
                                    <span>最近访问</span>
                                </div>
                            </div>
                            <div className={"home-box-item-detail"}>
                                <WorkspaceRecentHome {...props}/>
                            </div>

                        </div>
                        <div className={"home-box-item"}>
                            <div className={"home-item-title-box"}>
                                <div className={"home-item-title"}>
                                    <svg className="home-item-title-icon" aria-hidden="true">
                                        <use xlinkHref= {`#icon-daibanshixiang`} />
                                    </svg>
                                    <span>代办信息</span>
                                </div>
                                <a onClick={changeTodo}>更多</a>
                            </div>
                            <div  className={"home-box-item-detail"}>
                                <Empty
                                    image={emptyImg}
                                    imageStyle={{  height: 60 }}
                                    description={
                                        <span>暂无数据</span>
                                    }
                                >
                                </Empty>
                            </div>

                        </div>
                    </div>
                    <div className={"home-box-item-dynamic"}>
                        <div className={"home-item-title-box"}>
                            <div className={"home-item-title"}>
                                <svg className="home-item-title-icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-rizhijilu`} />
                                </svg>
                                <apan>动态信息</apan>
                            </div>
                        </div>
                        <div style={{"padding":" 0 20px"}}>
                            <DynamicWidget/>
                        </div>
                    </div>
                </div>

                : <div className={"home-content-box"}>
                    <FullWorkTodo bgroup={"postin"} changeTodo={changeTodo}/>
                </div>
            }

        </div>
    )
}

export default Home;
