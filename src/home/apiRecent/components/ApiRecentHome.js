import React, {useEffect, useState} from "react";
import {getUser} from "thoughtware-core-ui";
import {inject, observer} from "mobx-react";
import {Empty, List, Skeleton, Tag} from "antd";
import IconCommon from "../../../common/IconCommon";
import apiRecentStore from "../store/ApiRecentStore";
/**
 * 最近访问的空间
 */
const ApiRecentHome = (props) =>{
    const {findApiRecentPage,apiRecent}=apiRecentStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);

    useEffect( async ()=>{
        let list = await findApiRecentPage()
        if(list==null) return
        let newList = list.slice(0,8);

        setDataList(newList)
    },[userId])

    /**
     * 去往详情页
     */
    const toDetail = (item) => {
        let workspaceId = item.workspace.id;
        let apiId  =  item.apix.id

        //设置最近打开的接口
        let params = {
            workspace:{id:workspaceId},
            apix:{id:apiId},
            // protocolType:item.apiRecent.protocolType
        }
        apiRecent(params)

        localStorage.setItem("workspaceId",workspaceId)
        localStorage.setItem("apiId",apiId)
        props.history.push('/workspace/apis/http/document');
    }



    return(
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            dataSource={dataList}
            locale={{
                emptyText: <Empty
                    imageStyle={{ height: 100 }}
                    description={<span>暂无动态</span>}
                />,
            }}
            renderItem={(item) => (
                <List.Item className={"home-list-api"} onClick={()=>toDetail(item)}>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <div className={"home-list-item"}>
                            <IconCommon
                                icon={"api1"}
                                style={{width:"32px",height:"32px"}}
                            />
                            <div>
                                <div className={"home-list-item-title"}>
                                    {item.apix?.node?.name}
                                </div>
                                <div className={"home-list-item-other"} >
                                    <div  className={"home-list-item-other-text"}> {item.workspace.workspaceName}</div>
                                </div>
                            </div>

                        </div>

                        <div>{item.updateTime}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}

export default observer(ApiRecentHome);