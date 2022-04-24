import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SystemSummary } from "app/models/simulation-result.model";
import { ModellingSystemCharacteristicsDictionary } from "app/dictionaries/modelling-system-characteristics.dictionary";
import { ChartsResultModel } from "app/models/charts-result.model";
import { Col, Row } from "antd";

export interface WrapperProps {
    chartsResult: ChartsResultModel;
    requiredCharacteristics: Array<Exclude<keyof SystemSummary, "name">>;
}

const processCharacteristics = (props: WrapperProps): unknown[] => {
    return props.requiredCharacteristics.map((name) => {
        return {
            title: {
                text: ModellingSystemCharacteristicsDictionary.get(name),
            },
            series: [
                {
                    data: props.chartsResult.result.map((s, i) => [props.chartsResult.parameter_range[i], Number(s.models_summary[0][name])]),
                },
            ],
        };
    });
};

const HighchartsWrapper = (props: WrapperProps) => {
    const options = processCharacteristics(props);
    return (
        <Row gutter={16}>
            {options.map((o, i) => (
                <Col span={12}>
                    <HighchartsReact key={i} highcharts={Highcharts} options={o} />
                </Col>
            ))}
        </Row>
    );
};

export default HighchartsWrapper;
