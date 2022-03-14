import {SystemVariablesModel} from 'app/models/system-variables.model';
import React from 'react';
import {SimulationResultModel, SystemSummary} from 'app/models/simulation-result.model';
import {Col, Descriptions, Row, Skeleton, Slider, Space} from 'antd';
import PortAnimation from 'app/components/port-animation';
import { Collapse } from 'antd';

const { Panel } = Collapse;

import "antd/lib/slider/style";
import "antd/lib/col/style";
import "antd/lib/row/style";
import "antd/lib/descriptions/style";
import "antd/lib/skeleton/style";
import "antd/lib/collapse/style";
import "antd/lib/space/style";

const ModellingVisualisation = (props: {systemVariables: SystemVariablesModel}) => {
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
  const requestURL = props?.systemVariables?.needSecondType
    ? `/api/calculate/modelling/poissonWithTypes/?${queryParams}`
    : `/api/calculate/modelling/poisson/?${queryParams}`

  React.useEffect(() => {
    if (queryParams) {
      setLoading(true);
      fetch(requestURL)
        .then(res => res.json())
        .then(
          (result: SimulationResultModel) => {
            setLoading(false);
            setTime(0);
            setResponse(result);
          },
          (err: unknown) => {
            console.error(err);
          }
        );
    }
  }, [props]);

  return (
    <Row>
      <Col span={15}>
        <PortAnimation simulationResult={response} time={time} systemParams={props.systemVariables}/>
        <Slider style={{width: 795}} disabled={loading} tipFormatter={null} value={time} min={0} max={props.systemVariables?.time ?? 10} marks={marks} onChange={(v) => setTime(v)}/>
      </Col>
      <Col span={9}>
        <Skeleton loading={loading} active={true}>
          <Collapse defaultActiveKey={['0']} style={{overflow: "auto", maxHeight: "500px"}}>
            {response?.models_summary.map((model: SystemSummary, index) => (
              <Panel key={index} header={model.name}>
                <Descriptions key={index} bordered column={1}>
                  <Descriptions.Item label="Среднее время пребывания в системе">{model.wait_system_time && Number.parseFloat(model.wait_system_time).toFixed(3)}</Descriptions.Item>
                  <Descriptions.Item label="Среднее время в очереди">{model.wait_queue_time && Number.parseFloat(model.wait_queue_time).toFixed(3)}</Descriptions.Item>
                  <Descriptions.Item label="Средняя длина очереди">{model.average_queue_len && Number.parseFloat(model.average_queue_len).toFixed(3)}</Descriptions.Item>
                  <Descriptions.Item label="Вероятность простоя">{model.idle_probability && Number.parseFloat(model.idle_probability).toFixed(3)}</Descriptions.Item>
                  <Descriptions.Item label="Вероятность отказа">{model.reject_probability && Number.parseFloat(model.reject_probability).toFixed(3)}</Descriptions.Item>
                  <Descriptions.Item label="Количество обслуженных судов">{model.served_customers_number}</Descriptions.Item>
                  <Descriptions.Item label="Количество судов, покинувших систему">{model.left_customers_number}</Descriptions.Item>
                </Descriptions>
              </Panel>
            ))}
          </Collapse>
        </Skeleton>
      </Col>
    </Row>
  );
}

export default ModellingVisualisation;
