import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {Axios} from "tiklab-core-ui";
import {Col,Card} from "antd";
import "./statisticsStyle.scss"

const defaultStates = ['已发布','设计中', '开发中','联调', '测试', '完成', '维护', '异常','废弃'];

const ApiStatusStatistics = ({workspaceId}) =>{
    const chartRef = useRef(null);

    useEffect(async () => {
        const chartInstance = echarts.init(chartRef.current);

        let res =  await Axios.post("/statistics/getApiStatusStatistics",{workspaceId:workspaceId})
        let data = res.data.list;

        // 创建默认状态映射
        const defaultStateMap = {};
        defaultStates.forEach(state => {
            defaultStateMap[state] = 0;
        });

        // 合并接口数据到默认状态
        data.forEach(item => {
            if(item.name==="total")return
            if (defaultStateMap.hasOwnProperty(item.name)) {
                defaultStateMap[item.name] = item.count;
            } else {
                defaultStateMap[item.name] = item.count;
            }
        });

        const names = Object.keys(defaultStateMap);
        const counts = Object.values(defaultStateMap);

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '2%',
                left: '2%',
                right: '2%',
                bottom: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: names
            },
            series: [
                {
                    name: '接口数',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'right',
                    },
                    data: counts
                }
            ]
        };
        chartInstance.setOption(option);


        const handleResize = () => chartInstance.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Col span={12}>
            <Card title={"接口状态统计"} bordered={false} className={"statistic-card-item"}>
                <div
                ref={chartRef}
                style={{ width: '100%', height: '400px' }}
            ></div>
            </Card>
        </Col>
    );
}

export default ApiStatusStatistics