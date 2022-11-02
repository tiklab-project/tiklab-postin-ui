import React, {useEffect, useState} from "react";
import {Button, List, Skeleton} from "antd";
import Avatar from "antd/es/avatar/avatar";

import {findLogList} from "./commonApi";

const height = 365;

const DynamicWidget = (props) =>{

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const [count, setCount] = useState(1);
    const [totalPage, setTotalPage] = useState();

    useEffect(() => {
        let params = {
            pageParam: {
                pageSize: 5,
                currentPage:1
            }
        }

        findList(params).then(res=>{
            setData(res);
            setList(res);
            setInitLoading(false);
        })
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        setCount(count+1)
        setList(
            data.concat(  [...new Array(5)].map(() => ({  loading: true })) ),
        );

        console.log(list)

        if(count<=totalPage){
            let params = {
                pageParam: {
                    pageSize: 5,
                    currentPage:count+1
                }
            }

            findList(params).then(res=>{
                const newData = data.concat(res);
                setData(newData);
                setList(newData);
                setLoading(false);
            })
        }

    }

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

        setTotalPage(data.totalPage);

        console.log(data)

        return newArr;
    };


    const loadMore =
        count<totalPage&&!initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    margin: 10,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <a onClick={onLoadMore}>加载更多</a>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar
                                style={{ backgroundColor: '#fff' }}
                                icon={ <svg className="dynamic-item-box-icon" aria-hidden="true">
                                    <use xlinkHref= {`#icon-dongtai`} />
                                </svg>}
                            />}
                            title={item.content?.module}
                            description={<div  dangerouslySetInnerHTML={{__html: item.opLogTemplate?.content}} />}
                        />
                        <div>{item.timestamp}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default DynamicWidget;