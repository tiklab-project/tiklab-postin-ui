import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Tabs} from 'antd';
import ResponseResult from "./responseResult";
import ResponseTabEdit from "./responseTabEdit";
const { TabPane } = Tabs;

// 输出参数 返回头部与返回结果的切换
const Response = (props) =>{
    const { apiResponseStore } = props;
    const {
        findApiResponseList,
        apiResponseList,
        deleteApiResponse
    } = apiResponseStore;


    const apxMethodId = localStorage.getItem('apxMethodId');
    const [activeKey, setActiveKey] = useState();

    useEffect( ()=> {
        findList()
    },[])

    const findList = async() =>{
        let res = await findApiResponseList({httpId:apxMethodId})
        setActiveKey(res[0].id)
    }
    
    //
    const onChange = e => {
        setActiveKey(e)
    };


    const remove = async (targetKey) => {
        await deleteApiResponse(targetKey);

        await findList()
    };

    const onEdit = (targetKey, action) => {
        if (action === 'remove') {
            remove(targetKey);
        }
    };

    const showTabPane = (list) =>{
        return list && list.map(item=>{
            return <TabPane tab={item.name+"("+item.httpCode+")"} key={item.id}>
                <ResponseResult httpId={apxMethodId} resultId={item.id} />
            </TabPane>
        })

    }


    return(
        <div className={'api-result-box'}>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                type="editable-card"
                tabBarExtraContent={
                    <ResponseTabEdit
                        apxMethodId={apxMethodId}
                        setActiveKey={setActiveKey}
                    />
                }

            >
                {
                    showTabPane(apiResponseList)
                }
            </Tabs>
        </div>
    )
    
}

export default inject("apiResponseStore")(observer(Response));
