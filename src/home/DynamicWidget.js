import React, {useEffect, useState} from "react";
import {Empty, List, Skeleton} from "antd";
import {Axios} from "tiklab-core-ui";
import emptyImg from "../assets/img/empty.png";

/**
 * 首页中动态
 */
const DynamicWidget = (props) =>{
    const {screen} = props;

    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(async () => {
        let params = {
            content:screen,
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

    /**
     * 查询日志列表
     */
    const findList = async (param) => {
        let params = {
            ...param,
            bgroup:"postin"
        }

        let res = await Axios.post('/oplog/findlogpage',params);
        let data = res.data

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

export default DynamicWidget;