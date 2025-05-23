// 柱状图组件

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

// 1.把功能代码都放到组件中
// 2.可变部分抽象成prop参数
const BarChart = ({ title, xData }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        // 保证dom可用 才进行图表渲染
        // 1.获取渲染图表的dom节点
        const chartDom = chartRef.current

        // 2.图表初始化生成图表实例对象
        const myChart = echarts.init(chartDom);

        // 3.准备图表参数
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [10, 40, 70],
                type: 'bar'
                }
            ]
        };

        // 4.使用图表参数完成图表渲染
        option && myChart.setOption(option);

    }, [])

    return <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
        
}

export default BarChart