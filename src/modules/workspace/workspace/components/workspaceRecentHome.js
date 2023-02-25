import React, {useEffect, useState} from "react";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import {toWorkspaceDetail} from "./workspaceFn";
import {Empty} from "antd";
import emptyImg from "../../../../assets/img/empty.png";

const WorkspaceRecentHome = (props) =>{
    const {workspaceStore} = props;
    const {findWorkspaceRecentList,workspaceRecent}=workspaceStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);


    useEffect( async ()=>{
        let list = await findWorkspaceRecentList({userId:userId})
        let newList = list.slice(0,4);

        setDataList(newList)
    },[userId])

    // 去往详情页
    const toDetail = (workspaceId) => {
        toWorkspaceDetail(workspaceId,userId,workspaceRecent)
        props.history.push('/workspace');
    }

    const showRecent=(list)=>{
        return list&&list.map(item=>{
            return(
                <div key={item.id} className={"home-recent-item"} onClick={()=>toDetail(item.id)}>
                    <div className={"home-recent-item-left"}>
                        <img src={item.iconUrl} alt={"icon"} className={"ws-img-icon"}/>
                        <div className={"home-recent-item-left-name"}>{item.workspaceName}</div>
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
        <div className={"home-recent-box"}>
            {
                dataList&&dataList.length>0
                    ?showRecent(dataList)
                    : <Empty
                        description={<span>暂无访问</span>}
                        image={emptyImg}
                    />
            }


        </div>
    )
}

export default inject("workspaceStore")(observer(WorkspaceRecentHome));