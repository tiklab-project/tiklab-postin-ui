import React, {useEffect, useState} from "react";
import {Badge, Drawer} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {Axios, getUser} from "tiklab-core-ui";
import "./messageStyle.scss"

const MessageDrawer = (props) =>{

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const [count, setCount] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [length, setLength] = useState();

    const [open, setOpen] = useState(false);


    useEffect(()=>{
        let params = {
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }
        findList(params)

    },[])

    //抽屉展示
    const showDrawer = () => {
        let params = {
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }
        findList(params).then(res=>{
            setData(res);
            setList(res);
            setInitLoading(false);
        })

        setOpen(true);
    };

    //加载更多
    const onLoadMore = () => {
        setLoading(true);
        setCount(count+1)
        setList(
            data.concat(  [...new Array(5)].map(() => ({  loading: true })) ),
        );

        if(count<=totalPage){
            let params = {
                pageParam: {
                    pageSize: 10,
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

    //查询接口
    const findList = async (params) =>{
        const param = {
            sendType: 'site',
            receiver: getUser().userId,
            application:"postin",
            ...params
        }

        let res = await Axios.post('/message/messageDispatchItem/findMessageDispatchItemPage', param);
        if (res.code === 0) {
            let total= res.data.totalPage
            setTotalPage(total)
            setLength(res.data.totalRecord)
            return res.data.dataList;
        }
    }



    //是否展示 加载更多
    const loadMore =()=>{
       return  count<totalPage&&!initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <a onClick={onLoadMore}>加载更多...</a>
            </div>
        ) : null;
    }


    //list item 渲染
    const showListItem = (list) =>{
        if(!list) return null;

        return list.map(item=>{
            return(
                <div key={item.id} className={"message-item"}>
                    <div className={"message-item-left"}>
                        <svg className=" message-item-icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-xiaoxi`} />
                        </svg>

                        <div className={"message-item-left-detail"}>
                            <div style={{"display":"flex"}}>
                                <div>{item?.messageTemplate?.title}</div>
                                <div className={"message-item-left-time"}>{item?.receiveTime}</div>
                            </div>
                            <div className={"message-item-left-content"}>{item?.messageTemplate?.content}</div>

                        </div>
                    </div>
                    <div className={"message-item-right"}>
                        <div className={"message-item-right-content"}>已读</div>
                    </div>

                </div>
            )
        })
    }




    //关闭抽屉
    const onClose = () => {
        setOpen(false)

        setTotalPage(1)
        setCount(1)
    }

    return (
        <>
            <Badge count={length}>
                <BellOutlined style={{fontSize: 21}} onClick={showDrawer}/>
            </Badge>
            <Drawer
                title="消息"
                placement="right"
                onClose={onClose}
                open={open}
                mask={false}
            >
                {
                    showListItem(list)
                }
                {
                    loadMore()
                }
            </Drawer>
        </>
    );
}

export default MessageDrawer;