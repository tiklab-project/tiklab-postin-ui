import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import {Col, Card} from "antd";
import "./statisticsStyle.scss"

const StatisticsTrend = ({workspaceId}) =>{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    //默认30天
    const [selectedDays, setSelectedDays] = useState(7);

    useEffect(() => {
        const initChart = async () => {
            if (chartRef.current) {
                if (!chartInstanceRef.current) {
                    chartInstanceRef.current = echarts.init(chartRef.current);
                }
                await findStatistics(selectedDays);
            }
        };

        initChart();

        const handleResize = () => chartInstanceRef.current.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const findStatistics = async (days) => {
        const endTime = new Date();
        endTime.setDate(endTime.getDate()-1)

        let tempStartDate = new Date(endTime);
        tempStartDate.setDate(endTime.getDate() - days);
        let startTime = new Date(tempStartDate); // 更新startTime

        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0],
            workspaceId:workspaceId
        };

        let res = await Axios.post("/statistics/getStatisticsTrend", param);
        let data = res.data;

        if (!data || data.length === 0) {
            console.error("No data returned from API");
            return;
        }

        const dates = data.map(item => item.date);
        const publishs = data.map(item => item["publish"]);
        const designs = data.map(item => item["design"]);
        const developments = data.map(item => item["development"]);
        const intergrateds = data.map(item => item["intergrated"]);
        const tests = data.map(item => item["test"]);
        const completes = data.map(item => item["complete"]);
        const maintains = data.map(item => item["maintain"]);
        const errors = data.map(item => item["error"]);
        const obsoletes = data.map(item => item["obsolete"]);

        const option = createOption(
            dates,
            publishs,
            designs,
            developments,
            intergrateds,
            tests,
            completes,
            maintains,
            errors,
            obsoletes,
        );

        if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption(option);
        }
    };

    const createOption = (
        dates,
        publishs,
        designs,
        developments,
        intergrateds,
        tests,
        completes,
        maintains,
        errors,
        obsoletes,
    ) => ({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['设计中','开发中', '测试', '异常'],
        },
        grid: {
            top: '10%',
            left: '2%',
            right: '2%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                interval: 'auto'
            }
        },
        yAxis: {
            type: 'value',
        },

        series: [
            // {
            //     name: '已发布',
            //     type: 'line',
            //     data: publishs
            // },
            {
                name: '设计中',
                type: 'line',
                data: designs
            },
            {
                name: '开发中',
                type: 'line',
                data: developments
            },
            // {
            //     name: '联调',
            //     type: 'line',
            //     data: intergrateds
            // },
            {
                name: '测试',
                type: 'line',
                data: tests
            },
            // {
            //     name: '完成',
            //     type: 'line',
            //     data: completes
            // },{
            //     name: '维护',
            //     type: 'line',
            //     data: maintains
            // },
            {
                name: '异常',
                type: 'line',
                data: errors
            },
            // {
            //     name: '废弃',
            //     type: 'line',
            //     data: obsoletes
            // },
        ]
    });

    return (
        <Col span={12}>
            <Card title={"接口趋势统计"} bordered={false} className={"statistic-card-item"}>
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px' }}
                ></div>
             </Card>
         </Col>
    );
}

export default StatisticsTrend