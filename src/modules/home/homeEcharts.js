import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import React, {useEffect, useRef} from "react";

echarts.use([GridComponent, BarChart, CanvasRenderer]);


const HomeEcharts = (props) =>{
    const {totalData} = props;

    const echartsRef = useRef(null);

    let option = {
        xAxis: {
            type: 'category',
            data: ['空间总数', '我创建的', '我参与的','我关注的']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: totalData,
                type: 'bar',
                barWidth : 80,
                itemStyle: {        //上方显示数值
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: "#5f5f5f",
                                fontSize: 16
                            }
                        }
                    }
                }
            }
        ]
    };

    useEffect(() => {
        // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
        let myChart = echarts.init(echartsRef.current);

        // 设置图表实例的配置项和数据
        myChart.setOption(option)

        // 组件卸载
        return () => {
            // myChart.dispose() 销毁实例。实例销毁后无法再被使用
            myChart.dispose()
        }
    },[totalData])



    return(
        <div style={{width: "960px", height: "400px"}}  ref={echartsRef}>

        </div>
    )
}

export  default  HomeEcharts;
