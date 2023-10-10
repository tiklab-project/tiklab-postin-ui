import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs} from 'antd';
import ResponseResult from "./ResponseResult";
import ResponseTabEdit from "./ResponseTabEdit";
import noneImg from "../../../../assets/img/none.png";
import apiResponseStore from "../store/ApiResponseStore";
const { TabPane } = Tabs;

/**
 * 定义
 * http
 * 输出参数 返回头部与返回结果的切换
 */
const Response = (props) =>{
    const {
        findApiResponseList,
        apiResponseList,
        deleteApiResponse
    } = apiResponseStore;


    const apiId = localStorage.getItem('apiId');
    const [activeKey, setActiveKey] = useState();

    useEffect( ()=> {
        findList()
    },[])

    const findList = async() =>{
        let res = await findApiResponseList({httpId:apiId})
        setActiveKey(res[0].id)
    }
    
    // tab页切换
    const onChange = e => {
        setActiveKey(e)
    };

    // tab页添加删除
    const onEdit = async (targetKey, action) => {

        if (action === 'remove') {
            await deleteApiResponse(targetKey);

            await findList()
        }

    };


    return(
        <div className={'api-result-box'}>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                type="editable-card"
                style={{height: 365 }}
                tabBarExtraContent={{
                    right:<ResponseTabEdit
                    apiId={apiId}
                    setActiveKey={setActiveKey}
                    />
                }}
            >
                {
                    apiResponseList && apiResponseList.map(pane=>{
                        return <TabPane
                            tab={pane.name+"("+pane.httpCode+")"}
                            key={pane.id}
                        >
                            <ResponseResult httpId={apiId} resultId={pane.id} />
                        </TabPane>
                    })
                }
                {
                    apiResponseList && apiResponseList.length > 0
                        ?null
                        :<div className={"pi-none-process-box"}>
                            <div style={{textAlign: "center"}}>
                                <div>
                                    <img width={200} height={200}  src={noneImg} alt={"noneImg"}/>
                                </div>
                                <span>暂无返回结果，请添加</span>
                            </div>
                        </div>
                }

            </Tabs>



        </div>
    )
}

export default observer(Response);
