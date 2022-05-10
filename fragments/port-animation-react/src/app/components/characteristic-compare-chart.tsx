import { Button, Col, Collapse, Drawer, Form, FormInstance, Input, notification, Row, Select, Skeleton, Space } from "antd";
import React from "react";

import HighchartsWrapper from "../components/highcharts-wrapper";
import { ModellingSystemCharacteristicsDictionary } from "../dictionaries/modelling-system-characteristics.dictionary";
import { SystemParametersDictionary } from "../dictionaries/required-system-variables.distionary";
import { ChartsResultModel } from "../models/charts-result.model";
import { SystemVariablesModel } from "../models/system-variables.model";

const { Option } = Select;
const { Panel } = Collapse;

import "antd/lib/button/style/index.css";
import "antd/lib/space/style/index.css";
import "antd/lib/row/style";
import "antd/lib/col/style";
import "antd/lib/drawer/style/index.css";
import "antd/lib/dropdown/style/index.css";
import "antd/lib/select/style/index.css";
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/notification/style/index.css";
import "antd/lib/collapse/style/index.css";
import "antd/lib/skeleton/style/index.css";

const errorNotification = () => {
    notification["error"]({
        message: "Something went wrong!",
    });
};

const CharacteristicCompareChart = (props: { readonly systemVariables: SystemVariablesModel, readonly loading: boolean }) => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [chartsResult, setChartsResult] = React.useState(null as ChartsResultModel);
    const [requiredCharacteristics, setRequiredCharacteristics] = React.useState([]);
    const [loading, setLoading] = React.useState(props.loading);

    const formRef = React.createRef<FormInstance>();
    const close = () => {
        setDrawerVisible(false);
    };

    React.useEffect(() => {
        setLoading(props.loading);
        setChartsResult(null as ChartsResultModel);
    }, [props])

    const apply = () => {
        formRef.current
            .validateFields()
            .then((result) => {
                setLoading(true);
                setDrawerVisible(false);
                return result;
            })
            .then((result: Record<string, unknown>) => {
                setRequiredCharacteristics(result["characteristic"] as []);
                const variables = { ...props.systemVariables, ...result };
                delete variables["requiredCharacteristics"];
                delete variables["characteristics"];
                let queryParams = "";
                Object.entries(variables)?.forEach(([k, v]: readonly [string, unknown]) => {
                    queryParams += `${k}=${encodeURIComponent(String(v))}&`;
                });
                const requestURL = `/api/calculate/modelling/charts/?${queryParams}`;
                return fetch(requestURL);
            })
            .then((res) => res.json())
            .then(
                (response: ChartsResultModel) => {
                    setLoading(false);
                    setChartsResult(response);
                },
                (e) => errorNotification(),
            )
            .catch((e) => {
                console.error(e);
            });
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    return (
        <>
            <Col span={22}>
                <Skeleton active={true} loading={loading}>
                    <Button onClick={showDrawer} type={"primary"}>
                        Построить графики сравнения?
                    </Button>
                    {!!chartsResult && (
                        <Collapse defaultActiveKey={["0"]}>
                            <Panel key={0} header={"Графики"}>
                                <HighchartsWrapper chartsResult={chartsResult} requiredCharacteristics={requiredCharacteristics} />
                            </Panel>
                        </Collapse>
                    )}
                </Skeleton>
            </Col>
            <Drawer
                title={"Выберите характеристики и параметр"}
                visible={drawerVisible}
                width={700}
                onClose={close}
                extra={
                    <Space>
                        <Button onClick={close}>Отмена</Button>
                        <Button onClick={apply} type="primary">
                            Рассчитать
                        </Button>
                    </Space>
                }>
                <Form layout="vertical" hideRequiredMark ref={formRef}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="characteristic" label="Характеристика" rules={[{ required: true, message: "Значение обязательно!" }]}>
                                <Select mode={"multiple"} placeholder="Выберите характеристику">
                                    {Array.from(ModellingSystemCharacteristicsDictionary).map(([key, value], i) => (
                                        <Option key={i} value={key}>
                                            {value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="parameter" label="Параметр" rules={[{ required: true, message: "Значение обязательно!" }]}>
                                <Select placeholder="Выберите параметр">
                                    {Array.from(SystemParametersDictionary).map(([key, value], i) => (
                                        <Option key={i} value={key}>
                                            {value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="from" label="От" rules={[{ required: true, message: "Значение обязательно!" }]}>
                                <Input type={"number"} placeholder="Please enter from" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="to" label="До" rules={[{ required: true, message: "Значение обязательно!" }]}>
                                <Input type={"number"} placeholder="Please enter to" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="step" label="Шаг" rules={[{ required: true, message: "Значение обязательно!" }]}>
                                <Input type={"number"} placeholder="Please enter step" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default CharacteristicCompareChart;
