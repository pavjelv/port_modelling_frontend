import { SystemVariablesModel } from "app/models/system-variables.model";
import React from "react";
import { SimulationResultModel, SystemSummary } from "app/models/simulation-result.model";
import { Descriptions, notification, Row, Skeleton, Slider, Space } from "antd";
import PortAnimation from "app/components/port-animation";
import { Collapse } from "antd";

const { Panel } = Collapse;

import "antd/lib/slider/style";
import "antd/lib/col/style";
import "antd/lib/row/style";
import "antd/lib/descriptions/style";
import "antd/lib/skeleton/style";
import "antd/lib/collapse/style";
import "antd/lib/space/style";
import "antd/lib/notification/style"

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
        Object.entries(props.systemVariables)?.forEach(([k, v]: [string, string]) => {
            queryParams += `${k}=${encodeURIComponent(v)}&`;
        });
    }
    const requestURL = props?.systemVariables?.needSecondType ? `/api/calculate/modelling/poissonWithTypes/?${queryParams}` : `/api/calculate/modelling/poisson/?${queryParams}`;

    React.useEffect(() => {
        if (queryParams) {
            setLoading(true);
            fetch(requestURL)
                .then((res) => res.json())
                .then(
                    (result: SimulationResultModel) => {
                        setLoading(false);
                        setTime(0);
                        setResponse(result);
                    }
                )
                .catch((e) => {
                    console.error(e);
                    errorNotification();
                });
        }
    }, [props]);
    return (
        <Space direction={"vertical"}>
            <Row>
                <h2>Параметры системы</h2>
            </Row>
            <Row>
                <Skeleton loading={loading} active={true}>
                    <Descriptions bordered layout="vertical">
                        <Descriptions.Item key={1} label={"Количество причалов"}>{props?.systemVariables?.serversNum}</Descriptions.Item>
                        <Descriptions.Item key={2} label={"Время обслуживания (сут.)"}>{props.systemVariables?.serveTime}</Descriptions.Item>
                        <Descriptions.Item key={3} label={"Интенсивность потока судов"}>{props.systemVariables?.lambda}</Descriptions.Item>
                        <Descriptions.Item key={4} label={"Максимальная длина очереди"}>{props.systemVariables?.queueLength}</Descriptions.Item>
                        <Descriptions.Item key={5} label={"Количество причалов для сухогруза"}>{props?.systemVariables?.cargoServersNum ?? 0}</Descriptions.Item>
                        <Descriptions.Item key={6} label={"Вероятность появления сухогруза"}>{props?.systemVariables?.cargoAppearanceProbability ?? 0}</Descriptions.Item>
                        <Descriptions.Item key={7} label={"Время обслуживания сухогруза (сут.)"}>{props?.systemVariables?.serveTimeCargo ?? 0}</Descriptions.Item>
                    </Descriptions>
                </Skeleton>
            </Row>
            <Row>
                <h2>Вычисленные характеристики</h2>
            </Row>
            <Row>
                <Skeleton loading={loading} active={true}>
                    <Collapse defaultActiveKey={["0"]} style={{ overflow: "auto", maxHeight: "500px", width: "50%" }}>
                        {response?.models_summary.map((model: SystemSummary, index) => (
                            <Panel key={index} header={model.name}>
                                <Descriptions key={index} bordered column={1}>
                                    {props?.systemVariables?.requiredCharacteristics?.map(({ key, value }) => (
                                        <Descriptions.Item key={index} label={value}>{model[key] && Number.parseFloat(model[key]).toFixed(3)}</Descriptions.Item>
                                    ))}
                                </Descriptions>
                            </Panel>
                        ))}
                    </Collapse>
                </Skeleton>
            </Row>
            <Row>
                <h2>Работа системы</h2>
            </Row>
            <Row>
                <PortAnimation simulationResult={response} time={time} systemParams={props.systemVariables} />
                <Slider style={{ width: 795 }} disabled={loading} tipFormatter={null} value={time} min={0} max={props.systemVariables?.time ?? 10} marks={marks} onChange={(v) => setTime(v)} />
            </Row>
        </Space>
    );
};

export default ModellingVisualisation;
