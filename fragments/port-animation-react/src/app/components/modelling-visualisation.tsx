import { BackTop, Col, Collapse, Descriptions, InputNumber, notification, Row, Skeleton, Slider, Space } from "antd";
import React from "react";

import CharacteristicCompareChart from "../components/characteristic-compare-chart";
import HistogramHighchartsWrapper from "../components/histogram-highcharts-wrapper";
import PortAnimation from "../components/port-animation";
import { SimulationResultModel, SystemSummary } from "../models/simulation-result.model";
import { SystemVariablesModel } from "../models/system-variables.model";

const { Panel } = Collapse;

import "antd/lib/slider/style/index.css";
import "antd/lib/grid/style/index.css";
import "antd/lib/descriptions/style/index.css";
import "antd/lib/skeleton/style/index.css";
import "antd/lib/collapse/style/index.css";
import "antd/lib/space/style/index.css";
import "antd/lib/notification/style/index.css";
import "antd/lib/back-top/style/index.css";
import "antd/lib/input-number/style/index.css"

const errorNotification = () => {
    notification["error"]({
        message: "Something went wrong!",
    });
};

const ModellingVisualisation = (props: { systemVariables: SystemVariablesModel }) => {
    const [loading, setLoading] = React.useState(true);
    const [response, setResponse] = React.useState<SimulationResultModel>(null);
    const [time, setTime] = React.useState(0);
    const marks = { 0: "0" };
    let queryParams = "";
    if (props.systemVariables) {
        marks[Number(props.systemVariables.time)] = props.systemVariables.time;
        const variables = {...props.systemVariables};
        delete variables["requiredCharacteristics"];
        Object.entries(variables as Exclude<SystemVariablesModel, "requiredCharacteristics">)?.forEach(([k, v]: [string, string | number | boolean]) => {
            queryParams += `${k}=${encodeURIComponent(v)}&`;
        });
    }
    const requestURL = props?.systemVariables?.needSecondType ? `/api/calculate/modelling/poissonWithTypes/?${queryParams}` : `/api/calculate/modelling/poisson/?${queryParams}`;

    React.useEffect(() => {
        if (queryParams) {
            setLoading(true);
            fetch(requestURL)
                .then((res) => res.json())
                .then((result: SimulationResultModel) => {
                    setLoading(false);
                    setTime(0);
                    setResponse(result);
                })
                .catch((e) => {
                    console.error(e);
                    errorNotification();
                });
        }
    }, [props, queryParams, requestURL]);
    return (
        <>
            <BackTop />
            <Space direction={"vertical"} style={{ width: "100%" }} size={16}>
                <Row>
                    <Col span={16}>
                        <h2>Параметры системы</h2>
                        <Skeleton loading={loading} active={true}>
                            <Collapse>
                                <Panel key={1} header={"Параметры"}>
                                    <Descriptions bordered layout="vertical">
                                        <Descriptions.Item key={1} label={"Количество причалов"}>
                                            {props?.systemVariables?.serversNum}
                                        </Descriptions.Item>
                                        <Descriptions.Item key={2} label={"Интенсивность потока судов"}>
                                            {props.systemVariables?.lambda}
                                        </Descriptions.Item>
                                        <Descriptions.Item key={3} label={"Распределение"}>
                                            {props.systemVariables?.arrivalDistribution}
                                        </Descriptions.Item>
                                        {props.systemVariables?.arrivalDistribution === "poisson" && (
                                            <Descriptions.Item key={2} label={"Время обслуживания (сут.)"}>
                                                {props.systemVariables?.serveTime}
                                            </Descriptions.Item>
                                        )}
                                        {props.systemVariables?.arrivalDistribution === "uniform" && (
                                            <>
                                                <Descriptions.Item key={2} label={"Время обслуживания от (сут.)"}>
                                                    {props.systemVariables?.a1}
                                                </Descriptions.Item>
                                                <Descriptions.Item key={2} label={"Время обслуживания до (сут.)"}>
                                                    {props.systemVariables?.b1}
                                                </Descriptions.Item>
                                            </>
                                        )}
                                        <Descriptions.Item key={4} label={"Максимальная длина очереди"}>
                                            {props.systemVariables?.queueLength}
                                        </Descriptions.Item>
                                        <Descriptions.Item key={5} label={"Количество причалов для сухогруза"}>
                                            {props?.systemVariables?.cargoServersNum ?? 0}
                                        </Descriptions.Item>
                                        <Descriptions.Item key={6} label={"Вероятность появления сухогруза"}>
                                            {props?.systemVariables?.cargoAppearanceProbability ?? 0}
                                        </Descriptions.Item>
                                        {props.systemVariables?.arrivalDistribution === "poisson" && (
                                            <Descriptions.Item key={7} label={"Время обслуживания сухогруза (сут.)"}>
                                                {props?.systemVariables?.serveTimeCargo ?? 0}
                                            </Descriptions.Item>
                                        )}
                                        {props.systemVariables?.arrivalDistribution === "uniform" && (
                                            <>
                                                <Descriptions.Item key={2} label={"Время обслуживания сухогруза от (сут.)"}>
                                                    {props.systemVariables?.a2}
                                                </Descriptions.Item>
                                                <Descriptions.Item key={2} label={"Время обслуживания сухогруза до (сут.)"}>
                                                    {props.systemVariables?.b2}
                                                </Descriptions.Item>
                                            </>
                                        )}
                                    </Descriptions>
                                </Panel>
                            </Collapse>
                        </Skeleton>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <h2>Вычисленные характеристики</h2>
                        <Skeleton loading={loading} active={true}>
                            <Collapse defaultActiveKey={["0"]} style={{ overflow: "auto", maxHeight: "540px" }}>
                                {response?.models_summary.map((model: SystemSummary, index) => (
                                    <Panel key={index} header={model.name}>
                                        <Descriptions key={index} bordered column={1}>
                                            {props?.systemVariables?.requiredCharacteristics?.map(({ key, value }) => (
                                                <Descriptions.Item key={index} label={value}>
                                                    {model[key] && (
                                                        key === "left_customers_number" ?
                                                            Number.parseInt(model[key], 10) :
                                                            Number.parseFloat(model[key]).toFixed(3)
                                                    )}
                                                </Descriptions.Item>
                                            ))}
                                        </Descriptions>
                                    </Panel>
                                ))}
                            </Collapse>
                        </Skeleton>
                    </Col>
                </Row>
                {response?.reserve_arrivals?.length > 0 &&
                    <Row>
                        <Col span={16}>
                            <h2>Структура потока, входящего на запасной терминал</h2>
                            <Skeleton loading={loading} active={true}>
                                <Collapse style={{ overflow: "auto", maxHeight: "540px" }}>
                                    <Panel key={0} header={'Гистограмма'}>
                                        <HistogramHighchartsWrapper data={response?.reserve_arrivals} title={'Интервалы между поступлениями заявок на запасной терминал'} />
                                    </Panel>
                                </Collapse>
                            </Skeleton>
                        </Col>
                    </Row>
                }
                <Row>
                    <CharacteristicCompareChart loading={loading} systemVariables={props.systemVariables} />
                </Row>
                <Row>
                    <Col span={16}>
                        <h2>Работа системы</h2>
                        <PortAnimation simulationResult={response} time={time} systemParams={props.systemVariables} />
                        <Row>
                            <Col span={19}>
                                <Slider step={0.1} disabled={loading} tipFormatter={null} value={typeof time === 'number' ? time : 0} min={0} max={props.systemVariables?.time ?? 10} marks={marks} onChange={(v) => setTime(v)} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    step={0.1}
                                    style={{ margin: '0 16px' }}
                                    value={time}
                                    onChange={(v) => setTime(v)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Space>
        </>
    );
};

export default ModellingVisualisation;
