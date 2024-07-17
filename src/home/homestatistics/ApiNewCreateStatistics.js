import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts';
import {Axios} from "thoughtware-core-ui";
import {Radio} from "antd";

const ApiNewCreateStatistics = (props) =>{
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [selectedDays, setSelectedDays] = useState(7);

    useEffect(() => {
        chartInstanceRef.current = echarts.init(chartRef.current);
        findStatistics(selectedDays);

        return () => {
            chartInstanceRef.current.dispose();
        };
    }, []);

    const findStatistics = async (days) => {
        setSelectedDays(days);

        const endTime = new Date();
        const startTime = new Date();
        startTime.setDate(endTime.getDate() - days + 1);

        const param = {
            startTime: startTime.toISOString().split('T')[0],
            endTime: endTime.toISOString().split('T')[0]
        };

        let res = await Axios.post("/statistics/getApiNewCreateStatistics", param);
        let data = res.data;

        const dates = data.map(item => item.date);
        const httpCounts = data.map(item => item.http);
        const wsCounts = data.map(item => item.ws);

        const option = createOption(dates, httpCounts, wsCounts);
        chartInstanceRef.current.setOption(option);
    };

    const createOption = (dates, httpCounts, wsCounts) => ({
        title: {
            text: '每天新增接口数',
            textStyle: {
                fontSize: 13,
            },
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['HTTP', 'WS']
        },
        grid: {
            top: '10%',
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'HTTP',
                type: 'line',
                data: httpCounts
            },
            {
                name: 'WS',
                type: 'line',
                data: wsCounts
            }
        ]
    });

    const handleRadioChange = async (e) => {
        await findStatistics(e.target.value);
    };

    return (
        <>
            <div className={"statistics-add-radio"}>
                <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedDays}
                    size="small"
                >
                    <Radio.Button value={7}>7天</Radio.Button>
                    <Radio.Button value={30}>30天</Radio.Button>
                    <Radio.Button value={182}>半年</Radio.Button>
                </Radio.Group>
            </div>

            <div
                ref={chartRef}
                style={{ width: '100%', height: '400px' }}
            ></div>
        </>

    );
}

export default ApiNewCreateStatistics