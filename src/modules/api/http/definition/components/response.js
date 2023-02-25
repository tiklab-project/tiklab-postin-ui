import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Col, Dropdown, Menu, Row, Tabs} from 'antd';
import ResponseResult from "./responseResult";
import ResponseTabEdit from "./responseTabEdit";
import noneImg from "../../../../../assets/img/none.png";
import IconCommon from "../../../../common/iconCommon";
import {CategoryEdit} from "../../../../category";
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
                tabPosition={"left"}
                style={{height: 365 }}
                tabBarExtraContent={{
                    left:<ResponseTabEdit
                    apxMethodId={apxMethodId}
                    setActiveKey={setActiveKey}
                    />
                }}
            >
                {
                    apiResponseList && apiResponseList.map(pane=>{
                        return <TabPane
                            tab={
                                <TabWithButton
                                    pane={pane}
                                    deleteTab={() => onEdit(pane.id, "remove")}
                                />
                            }
                            key={pane.id}
                        >
                            <ResponseResult httpId={apxMethodId} resultId={pane.id} />
                        </TabPane>
                    })
                }
            </Tabs>

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

        </div>
    )
    
}

const TabWithButton = ({ pane, deleteTab }) => {


    const menu = (
        <Menu>
            <Menu.Item>
                <ResponseTabEdit type={"edit"} apiResponseId={pane.id}/>
            </Menu.Item>
            <Menu.Item>
                <span onClick={deleteTab}>删除</span>
            </Menu.Item>
        </Menu>
    );


    return (
        <div style={{ display: "flex", justifyContent: "space-between",width: "160px",color:"black"}}>
            <span className={"api-result-box-tab-item-title"}>{pane.name+"("+pane.httpCode+")"}</span>
            <Dropdown overlay={menu}  >
                <div style={{"display":"flex","alignItems":"center"}}>
                    <IconCommon
                        className={"icon-s"}
                        icon={"more"}
                    />
                </div>
            </Dropdown>
        </div>
    );
};


export default inject("apiResponseStore")(observer(Response));
