import React from "react";
import { SystemVariablesModel } from "app/models/system-variables.model";
import { Button, Col, Collapse, Drawer, Form, FormInstance, Input, notification, Row, Select, Space } from "antd";
import HighchartsWrapper from "app/components/highcharts-wrapper";
import { ModellingSystemCharacteristicsDictionary } from "app/dictionaries/modelling-system-characteristics.dictionary";
import { SystemParametersDictionary } from "app/dictionaries/required-system-variables.distionary";
import { ChartsResultModel } from "app/models/charts-result.model";

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

const errorNotification = () => {
    notification["error"]({
        message: "Something went wrong!",
    });
};

const CharacteristicCompareChart = (props: { systemVariables: SystemVariablesModel }) => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [chartsResult, setChartsResult] = React.useState(null as ChartsResultModel);
    const [requiredCharacteristics, setRequiredCharacteristics] = React.useState([]);

    const formRef = React.createRef<FormInstance>();
    const close = () => {
        setDrawerVisible(false);
    };

    const apply = () => {
        formRef.current
            .validateFields()
            .then((result) => {
                setDrawerVisible(false);
                return result;
            })
            .then((result: Record<string, unknown>) => {
                setRequiredCharacteristics(result["characteristic"] as []);
                const variables = { ...props.systemVariables, ...result };
                delete variables["requiredCharacteristics"];
                delete variables["characteristics"];
                let queryParams = "";
                Object.entries(variables)?.forEach(([k, v]: [string, unknown]) => {
                    queryParams += `${k}=${encodeURIComponent(String(v))}&`;
                });
                const requestURL = `/api/calculate/modelling/charts/?${queryParams}`;
                return fetch(requestURL);
            })
            .then((res) => res.json())
            .then(
                (response: ChartsResultModel) => {
                    console.log(response);
                    setChartsResult(response);
                },
                (e) => errorNotification(),
            )
            .catch((e) => {});
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    return (
        <>
            <Col span={22}>
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
            </Col>
            <Drawer
                title={"Выберите характеристики и параметр"}
                visible={drawerVisible}
                width={700}
                onClose={close}
                extra={
                    <Space>
                        <Button onClick={close}>Cancel</Button>
                        <Button onClick={apply} type="primary">
                            Submit
                        </Button>
                    </Space>
                }>
                <Form layout="vertical" hideRequiredMark ref={formRef}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="characteristic" label="Characteristic" rules={[{ required: true, message: "Please select an characteristic" }]}>
                                <Select mode={"multiple"} placeholder="Please select characteristic">
                                    {Array.from(ModellingSystemCharacteristicsDictionary).map(([key, value], i) => (
                                        <Option key={i} value={key}>
                                            {value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="parameter" label="Parameter" rules={[{ required: true, message: "Please select parameter" }]}>
                                <Select placeholder="Please select parameter">
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
                            <Form.Item name="from" label="From" rules={[{ required: true, message: "Please enter user name" }]}>
                                <Input type={"number"} placeholder="Please enter from" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="to" label="To" rules={[{ required: true, message: "Please enter user name" }]}>
                                <Input type={"number"} placeholder="Please enter to" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="step" label="Step" rules={[{ required: true, message: "Please enter user name" }]}>
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
