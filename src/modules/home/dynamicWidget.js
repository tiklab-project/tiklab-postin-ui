import React, {useEffect, useState} from "react";
import {Empty, List, Skeleton} from "antd";

import {findLogList} from "./commonApi";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import emptyImg from "../../assets/img/empty.png";


const DynamicWidget = (props) =>{
    const {screen,workspaceStore} = props;
    const {findWorkspaceJoinList} = workspaceStore;


    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);


    useEffect(async () => {
        let workspaceList=[];
        if(!screen){
            let res = await findWorkspaceJoinList({userId: getUser().userId})
            res.map(item=>{
                workspaceList.push( item.id)
            })
        }
        let contentList = { workspaceId:workspaceList }

        let params = {
            content:screen?screen:contentList,
            pageParam: {
                pageSize: 8,
                currentPage:1
            },
        }
        findList(params).then(res=>{
            setList(res);
            setInitLoading(false);
        })
    }, []);


    const findList = async (params) => {
        let data = await findLogList(params);

        let list = data.dataList;

        //datalist 处理
        let newArr = []
        let newList = (data)=>{
            return data&&data.map(item=>{
                newArr.push({
                    ...item,
                    content: {...JSON.parse(item.content)}
                })
            })
        }
        newList(list)

        return newArr;
    };

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={list}
            locale={{
                emptyText: <Empty
                    imageStyle={{ height: 120 }}
                    description={<span>暂无动态</span>}
                    image={emptyImg}
                />,
            }}
            renderItem={(item) => (
                <List.Item >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            description={<div  dangerouslySetInnerHTML={{__html: item.data}} />}
                        />
                        <div>{item.timestamp}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default inject("workspaceStore")(observer(DynamicWidget));