import React from "react";
import {observer} from "mobx-react";
import DynamicWidget from "./DynamicWidget";
import {Row,Col} from "antd";
import StatusNumberStatistics from "../../support/statistics/StatusNumberStatistics";
import StatisticsTrend from "../../support/statistics/StatisticsTrend";
import ApiStatusStatistics from "../../support/statistics/ApiStatusStatistics";

/**
 * 空间概况
 */
const WorkspaceOverViewPage = (props) =>{

    const workspaceId =  localStorage.getItem("workspaceId");

    return(
        <Row style={{height:"100%",overflow:"auto"}}>
            <Col
                md={{ span: 24, offset: 0 }}
                lg={{ span: 20, offset: 2 }}
                xl={{ span: 20, offset: 2 }}
                xll={{ span: 18, offset: 3 }}
            >
            <div className={"ws-init-box"}>
                <div className={"ws-init-content"}>
                    <div className={"wd-total"}>
                        <div className={"wd-title"}>接口统计</div>
                        <StatusNumberStatistics workspaceId={workspaceId}/>
                        <Row gutter={20}>
                            <StatisticsTrend workspaceId={workspaceId}/>
                            <ApiStatusStatistics workspaceId={workspaceId}/>
                        </Row>
                    </div>
                    <div className={"wd-dynamic-box"}>
                        <div className={"wd-title"} >最近动态</div>
                        <div style={{margin: "0 10px"}}>
                            <DynamicWidget screen={{"workspaceId": workspaceId}}/>
                        </div>
                    </div>
                </div>
            </div>
            </Col>
        </Row>
    )
}

export default observer(WorkspaceOverViewPage);