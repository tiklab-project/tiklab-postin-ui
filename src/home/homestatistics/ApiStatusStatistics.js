import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";

const defaultStates = ['完成', '设计中', '开发中', '维护', '已发布', '测试'];

const ApiStatusStatistics = (props) =>{
    const chartRef = useRef(null);

    useEffect(async () => {
        const chartInstance = echarts.init(chartRef.current);
        let res =  await Axios.post("/statistics/getApiStatusStatistics")
        let data = res.data;

        // 创建默认状态映射
        const defaultStateMap = {};
        defaultStates.forEach(state => {
            defaultStateMap[state] = 0;
        });

        // 合并接口数据到默认状态
        data.forEach(item => {
            if (defaultStateMap.hasOwnProperty(item.name)) {
                defaultStateMap[item.name] = item.count;
            } else {
                defaultStateMap[item.name] = item.count;
            }
        });

        const names = Object.keys(defaultStateMap);
        const counts = Object.values(defaultStateMap);

        const option = {
            title: {
                text: '接口状态统计',
                textStyle: {
                    fontSize: 13,
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '10%',
                left: '2%',
                right: '2%',
                bottom: '2%',
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
        return () => {
            chartInstance.dispose();
        };
    }, []);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '400px' }}
        ></div>
    );
}

export default ApiStatusStatistics