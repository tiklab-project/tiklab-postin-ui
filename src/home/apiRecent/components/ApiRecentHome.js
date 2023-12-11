import React, {useEffect, useState} from "react";
import {getUser} from "thoughtware-core-ui";
import {inject, observer} from "mobx-react";
import {Empty, List, Skeleton, Tag} from "antd";
import emptyImg from "../../../assets/img/empty.png";
import IconCommon from "../../../common/IconCommon";
import apiRecentStore from "../store/ApiRecentStore";
/**
 * 最近访问的空间
 */
const ApiRecentHome = (props) =>{
    const {findApiRecentList,apiRecent}=apiRecentStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);

    useEffect( async ()=>{
        let list = await findApiRecentList({userId:userId})
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
            user:{id:getUser().userId},
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
                    imageStyle={{ height: 120 }}
                    description={<span>暂无动态</span>}
                    image={emptyImg}
                />,
            }}
            renderItem={(item) => (
                <List.Item className={"home-list-api"} onClick={()=>toDetail(item)}>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <div className={"home-list-item"}>
                            <IconCommon
                                icon={"api1"}
                                style={{width:"24px",height:"24px"}}
                            />
                            <div>
                                <div className={"home-list-item-title"}>
                                    {item.apix?.name}
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