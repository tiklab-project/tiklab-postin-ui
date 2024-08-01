import React, {useEffect, useState} from "react";
import {Row,Col} from "antd";
import {Axios} from "thoughtware-core-ui";

const StatusNumberStatistics = ({workspaceId}) =>{

    const [dataInfo, setDataInfo] = useState();

    const getStatisticsData = async (days) => {
        const endTime = new Date();
        const startTime = new Date();
        startTime.setDate(endTime.getDate() - days + 1);

        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0],
            workspaceId:workspaceId
        };
        let res = await Axios.post("/statistics/getApiStatusStatistics",param );
        setDataInfo(res.data.number);
    };

    useEffect(() => {
        getStatisticsData(7);
    }, []);

    const dataItem = [

        {
            title: "设计中",
            value: dataInfo?.design,
            color: "#5e70c2"
        },
        {
            title: "开发中",
            value: dataInfo?.development,
            color: "#a1ca7d"
        },
        {
            title: "测试",
            value: dataInfo?.test,
            color: "#efcc6b"
        },
        {
            title: "异常",
            value: dataInfo?.error,
            color: "#d77169"
        }
    ];


    const showItemBox = (data) => {
        return data.map((item, index) => (
            <Col
                key={index}
                span={6}
            >
                <div
                    style={{
                        textAlign:"center",
                        height: "80px",
                        background:"#f8f8f8",
                        padding: "13px",
                        margin: "0 0 15px 0",
                        borderRadius: "5px"
                    }}
                >
                    <div>
                        {item.title}
                    </div>
                    <div style={{fontSize:"18px",fontWeight:"bold",color:`${item.color}`}}>
                        {item.value}
                    </div>
                </div>

            </Col>
        ));
    };

    return (
        <Row gutter={20}>
            {showItemBox(dataItem)}
        </Row>
    );
}

export default StatusNumberStatistics;