import React, {useEffect, useState} from "react";
import {getUser} from "thoughtware-core-ui";
import {observer} from "mobx-react";
import {ShowWorkspaceIcon, toWorkspaceDetail} from "./WorkspaceFn";
import {Empty, Spin} from "antd";
import workspaceRecentStore from "../store/WorkspaceRecentStore";

/**
 * 最近访问的空间
 */
const WorkspaceRecentHome = (props) =>{
    const {findWorkspaceRecentPage,workspaceRecent}=workspaceRecentStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( async ()=>{
        let params = {
            pageParam: {
                pageSize: 4,
                currentPage:1
            },
            userId:userId
        }
        let list = await findWorkspaceRecentPage(params)

        setDataList(list)
        setLoading(false)
    },[userId])

    /**
     * 去往详情页
     */
    const toDetail = (workspaceId) => {
        toWorkspaceDetail(workspaceId,workspaceRecent,'/workspace/quickTest')
        props.history.push('/workspace/quickTest');
    }

    /**
     * 渲染最近访问的空间项
     */
    const showRecent=(list)=>{
        return list&&list.map(item=>{

            let workspace =  item?.workspace
            let iconurl =workspace?.iconUrl

            return(
                <div key={workspace.id} className={"home-recent-item"} onClick={()=>toDetail(workspace.id)}>
                    <div className={"home-recent-item-left"}>
                        <ShowWorkspaceIcon url={iconurl} className={"ws-img-icon icon-bg-border"}/>
                        <div className={"home-recent-item-left-name text-ellipsis"}>{workspace.workspaceName}</div>
                    </div>
                    <div style={{display:"flex","justifyContent":"space-between"}}>
                        <div className={"home-recent-item-num"}>
                            <div className={"home-recent-item-num-title"}>目录数</div>
                            <div>{item.categoryNum}</div>
                        </div>
                        <div className={"home-recent-item-num"}>
                            <div className={"home-recent-item-num-title"}>接口数</div>
                            <div>{item.apiNum}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }



    return(
        <Spin spinning={loading}>
            <div className={"home-recent-box"}>
                {
                    dataList&&dataList.length>0
                        ?<>{showRecent(dataList)}</>
                        : <Empty
                            description={<span>暂无访问</span>}
                        />
                }
            </div>
        </Spin>

    )
}

export default observer(WorkspaceRecentHome);