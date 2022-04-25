import React from "react";
import Highcharts  from "highcharts";
import HighchartsReact from "highcharts-react-official";

import bellCurve from "highcharts/modules/histogram-bellcurve"; //module
bellCurve(Highcharts); //init module

const HistogramHighchartsWrapper = (props: {data: number[], title: string}) => {
    const options: Highcharts.Options = {
        title: {
            text: 'Интервалы между входными заявками запасного терминала'
        },
        xAxis: [{
            title: { text: 'Данные' },
            alignTicks: false
        }, {
            title: { text: 'Гистограмма' },
            alignTicks: false,
            opposite: true
        }],
        yAxis: [{
            title: { text: 'Данные' }
        }, {
            title: { text: 'Гистограмма' },
            opposite: true
        }],
        plotOptions: {
            histogram: {
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.'
                    }
                }
            }
        },
        series: [{
            name: 'Гистограмма',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            zIndex: -1
        }, {
            name: 'Данные',
            type: 'scatter',
            data: props.data,
            id: 's1',
            marker: {
                radius: 1.5
            }
        }]
    }
    return (
        <div>
            {props.data?.length &&
                <HighchartsReact constructorType={"chart"}
                                highcharts={Highcharts}
                                options={options} />
            }
        </div>
    );
};

export default HistogramHighchartsWrapper;
