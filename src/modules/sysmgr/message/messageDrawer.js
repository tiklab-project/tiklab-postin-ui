import React, {useState} from "react";
import {Badge, Drawer} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {Axios, getUser} from "tiklab-core-ui";
import "./messageStyle.scss"
const MessageDrawer = (props) =>{
    const [open, setOpen] = useState(false);
    const [messageList, setMessageList] = useState();

    const showDrawer = () => {

        findList()


        setOpen(true);
    };


    const findList = async () =>{
        const params = {
            sendType: 'site',
            receiver: getUser().userId,
            application:"postin"
        }

        let res = await Axios.post('/message/messageDispatchItem/findMessageDispatchItemList', params);
        if (res.code === 0) {
            let List = res.data;

            setMessageList(List);
            console.log(List)
        }
    }

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
                            <div>{item?.messageTemplate?.title}</div>
                            <div className={"message-item-left-content"}>{item?.messageTemplate?.content}</div>
                            <div className={"message-item-left-time"}>{item?.receiveTime}</div>
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
    const onClose = () =>  setOpen(false)

    return (
        <>
            <Badge count={0}>
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
                    showListItem(messageList)
                }
            </Drawer>
        </>
    );
}

export default MessageDrawer;