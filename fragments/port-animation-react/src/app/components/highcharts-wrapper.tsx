import { Col, Row } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('highcharts/modules/exporting')(Highcharts);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('highcharts/modules/export-data')(Highcharts);
import React from "react";

import { ModellingSystemCharacteristicsDictionary } from "../dictionaries/modelling-system-characteristics.dictionary";
import { SystemParametersDictionary } from "../dictionaries/required-system-variables.distionary";
import { ChartsResultModel } from "../models/charts-result.model";
import { SystemSummary } from "../models/simulation-result.model";
import { RequiredSystemVariables } from "../models/system-variables.model";

export type WrapperProps = {
    readonly chartsResult: ChartsResultModel;
    readonly requiredCharacteristics: ReadonlyArray<Exclude<keyof SystemSummary, "name">>;
    readonly seriesName: string;
};

const processCharacteristics = (props: WrapperProps): readonly unknown[] => {
    return props.requiredCharacteristics.map((name) => {
        return {
            title: {
                text: ModellingSystemCharacteristicsDictionary.get(name),
            },
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ["viewFullscreen", "separator", "downloadPNG", "downloadSVG", "downloadPDF", "separator", "downloadXLS", "downloadCSV"],
                    },
                },
                enabled: true,
            },
            xAxis: {
                title: {
                    text: SystemParametersDictionary.get(props.seriesName as keyof RequiredSystemVariables),
                }
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
