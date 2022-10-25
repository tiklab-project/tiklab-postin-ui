import React, {useEffect, useState} from 'react';
import './homestyle.scss';
import {Axios, getUser} from "tiklab-core-ui"
import {inject, observer} from "mobx-react";
import WorkspaceRecentHome from "../workspace/components/workspaceRecentHome";

// 首页
const Home =(props)=> {
    const {workspaceStore} = props;
    const {findWorkspaceHomeTotal} = workspaceStore;

    const userId = getUser().userId


    const [logList, setLogList] = useState([]);

    useEffect(()=>{
        const params = {
            // sendType: 'site',
            receiver:userId,
            bgroup:"postin"
        }
        Axios.post('/oplog/findloglist', params).then(res => {
            if (res.code === 0) {
                let list = res.data;

                setLogList(list)
            }
        })
    },[])

    const showLog = (list) =>{
        return list&&list.map(item=>{
            return(
                <div key={item.id} className={""}>
                    <div> </div>
                </div>
            )
        })
    }

    return(
        <div className={"home-content"}>
            <div className={"home-content-box"}>
                <div className={"home-content-box-top"}>
                    <div className={"home-log-box"}>
                        <div className={"home-item-title"}> 代办信息</div>

                    </div>
                    <div className={"home-wait-box"}>
                        <div className={"home-item-title"}> 动态信息</div>
                        {
                            showLog(logList)
                        }
                    </div>
                </div>
                <div>
                    <div className={"home-title"}>最近访问的空间</div>

                    <WorkspaceRecentHome {...props}/>
                </div>

            </div>
        </div>
    )
}

export default inject("workspaceStore")(observer(Home));
