import React from 'react';
import './homestyle.scss';
import WorkspaceRecentHome from "../workspace/workspace/components/WorkspaceRecentHome";
import ApiStatusStatistics from "../support/statistics/ApiStatusStatistics";
import StatusNumberStatistics from "../support/statistics/StatusNumberStatistics";
import StatisticsTrend from "../support/statistics/StatisticsTrend";
import {Col, Row} from "antd"
/**
 * 首页
 */
const Home =(props)=> {

    return(
        <div className={"home-content"}>
            <Row style={{height:"100%"}}>
                <Col
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 20, offset: 2 }}
                    xl={{ span: 18, offset: 3 }}
                    xll={{ span: 16, offset: 4 }}
                >
                <div className={"home-content-box"}>
                    <div className={"home-box-item"}>
                        <div className={"home-item-title-box"}>
                            <div className={"home-item-title"}>
                                <span>常用空间</span>
                            </div>
                        </div>
                        <WorkspaceRecentHome {...props}/>
                    </div>
                    <div className={"home-box-item-dynamic"}>
                        <div className={"home-item-title-box"}>
                            <div className={"home-item-title"}>
                                <span>接口统计</span>
                            </div>
                        </div>
                        <StatusNumberStatistics />
                        <Row gutter={20}>
                            <StatisticsTrend/>
                            <ApiStatusStatistics />
                        </Row>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home;
