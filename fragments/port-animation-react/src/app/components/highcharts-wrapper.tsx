import { Col, Row } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

import { ModellingSystemCharacteristicsDictionary } from "../dictionaries/modelling-system-characteristics.dictionary";
import { ChartsResultModel } from "../models/charts-result.model";
import { SystemSummary } from "../models/simulation-result.model";

export type WrapperProps = {
    readonly chartsResult: ChartsResultModel;
    readonly requiredCharacteristics: ReadonlyArray<Exclude<keyof SystemSummary, "name">>;
};

const processCharacteristics = (props: WrapperProps): readonly unknown[] => {
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
