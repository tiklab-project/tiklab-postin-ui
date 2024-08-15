import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Breadcrumb, Col,Row} from "antd";
import dataStructureStore from "../store/DataStructureStore";
import JsonStructure from "./JsonStructure";

/**
 * 结构页详情
 */
const StructureDetail = (props) => {
    const {findDataStructure} = dataStructureStore

    const [data, setData] = useState();
    let  dataStructureId = localStorage.getItem("dataStructureId")

    useEffect(async ()=>{

        let res = await findDataStructure( dataStructureId);

        setData(res)

    },[])


    /**
     * 去往结构列表页
     */
    const backToList =() =>{
        props.history.push("/workspace/dataStructure")
    }

    return(
        <Row style={{height:"100%"}}>
        <Col
            xs={{ span: "24" }}
            sm={{ span: "24" }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 18, offset: 3 }}
            xll={{ span: 16, offset: 4 }}
        >
            <div className={"structure-content"}>
                <div className={"structure-content-box"}>
                    <Breadcrumb className={"breadcrumb-box"} style={{margin:"0 0 10px 0"}}>
                        <Breadcrumb.Item onClick={backToList} className={"first-item"}>数据结构</Breadcrumb.Item>
                        <Breadcrumb.Item>{data?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={"structure-content-box-main"}>
                        <div className={"structure-content-box-main-detail"}>
                            <div>名称： {data?.name}</div>
                            <div>类型： {data?.dataType}</div>
                        </div>
                        <JsonStructure />
                    </div>
                </div>
            </div>
        </Col>
        </Row>
    )
}


export default observer(StructureDetail);
