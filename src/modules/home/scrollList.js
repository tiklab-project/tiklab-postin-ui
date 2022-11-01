import React, {useEffect, useState} from "react";
import {List} from "antd";
import Avatar from "antd/es/avatar/avatar";
import VirtualList from 'rc-virtual-list';

import {findLogList} from "./commonApi";

const ScrollList = (props) =>{

    const [data, setData] = useState([]);

    const appendData = async () => {
        let data = await findLogList();

        setData(data)
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === height) {
            appendData();
        }
    };



    return (
        <List>
            <VirtualList
                data={data}
                height={height}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.user?.avatar} />}
                            title={item.module}
                            description={<div  dangerouslySetInnerHTML={{__html: item.opLogTemplate?.content}} />}
                        />
                        <div>{item.timestamp}</div>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
}

export default ScrollList;