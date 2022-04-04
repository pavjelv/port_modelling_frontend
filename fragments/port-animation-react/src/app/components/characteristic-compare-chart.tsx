import React from "react";
import { SystemVariablesModel } from "app/models/system-variables.model";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";

const { Option } = Select

import "antd/lib/button/style/index.css"
import "antd/lib/space/style/index.css"
import "antd/lib/row/style"
import "antd/lib/drawer/style/index.css"
import "antd/lib/dropdown/style/index.css"
import "antd/lib/select/style/index.css"
import "antd/lib/form/style/index.css"
import "antd/lib/input/style/index.css"
import HighchartsWrapper from "app/components/highcharts-wrapper";

const CharacteristicCompareChart = (props: { systemVariables: SystemVariablesModel }) => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);

    const close = () => {
        setDrawerVisible(false);
    }

    const showDrawer = () => {
        setDrawerVisible(true);
    }

    return (
        <>
            <Button onClick={showDrawer}>
                Построить графики сравнения?
            </Button>
            <div style={{height: "500px"}}>
                <HighchartsWrapper/>
            </div>
            <Drawer
                title={"Выберите характеристики и параметр"}
                visible={drawerVisible}
                width={700}
                onClose={close}
                extra={
                    <Space>
                        <Button onClick={close}>Cancel</Button>
                        <Button onClick={close} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="characteristic"
                                label="Characteristic"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Select mode={"multiple"}
                                        placeholder="Please select characteristic"
                                >
                                    <Option value="1">Char1</Option>
                                    <Option value="2">Char2</Option>
                                    <Option value="3">Char3</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="parameter"
                                label="Parameter"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Select placeholder="Please select parameter">
                                    <Option value="1">Param1</Option>
                                    <Option value="2">Param2</Option>
                                    <Option value="3">Param3</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="from"
                                label="From"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter from" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="to"
                                label="To"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter to" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="step"
                                label="Step"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter step" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

export default CharacteristicCompareChart;
