import React, {useEffect, useState} from "react";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import {Empty, List, Skeleton, Tag} from "antd";
import emptyImg from "../../../assets/img/empty.png";
import IconCommon from "../../../common/IconCommon";

/**
 * 最近访问的空间
 */
const ApiRecentHome = (props) =>{
    const {apiRecentStore} = props;
    const {findApiRecentList,apiRecent}=apiRecentStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);

    useEffect( async ()=>{
        let list = await findApiRecentList({userId:userId})
        let newList = list.slice(0,4);

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
            // protocolType:item.apix.protocolType
        }
        apiRecent(params)

        localStorage.setItem("workspaceId",workspaceId)
        localStorage.setItem("apxMethodId",apiId)
        props.history.push('/workspace/apis/document');
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
                                icon={"jiekou1"}
                                className="ws-img-icon"
                            />
                            <div>
                                <div className={"home-list-item-title"}>
                                    {item.apix?.name}
                                </div>
                                <div className={"home-list-item-other"} >
                                    <div className={"home-list-item-other-text"} >空间 :  </div>
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

export default inject("apiRecentStore")(observer(ApiRecentHome));