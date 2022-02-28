import {SystemVariablesModel} from 'app/models/system-variables.model';
import React from 'react';
import {SimulationResultModel} from 'app/models/simulation-result.model';
import {Col, Descriptions, Row, Skeleton, Slider} from 'antd';
import PortAnimation from 'app/components/port-animation';

import "antd/lib/slider/style";
import "antd/lib/col/style";
import "antd/lib/row/style";
import "antd/lib/descriptions/style";
import "antd/lib/skeleton/style";

const ModellingVisualisation = (props: {systemVariables: SystemVariablesModel}) => {
  const [loading, setLoading] = React.useState(true);
  const [response, setResponse] = React.useState<SimulationResultModel>(null);
  const [time, setTime] = React.useState(0);
  const marks = { 0: "0", 20: "20" };
  let queryParams = "";
  if (props.systemVariables) {
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
      <Col span={16}>
        <PortAnimation simulationResult={response} time={time} systemParams={props.systemVariables}/>
        <Slider style={{width: 795}} disabled={loading} tipFormatter={null} value={time} min={0} max={20} marks={marks} onChange={(v) => setTime(v)}/>
      </Col>
      <Col span={8}>
        <Skeleton loading={loading} active={true}>
          <Descriptions title="Результат" bordered column={1}>
            <Descriptions.Item label="Среднее время пребывания в системе">{response?.wait_system_time && Number.parseFloat(response.wait_system_time).toFixed(3)}</Descriptions.Item>
            <Descriptions.Item label="Среднее время в очереди">{response?.wait_queue_time && Number.parseFloat(response.wait_queue_time).toFixed(3)}</Descriptions.Item>
            <Descriptions.Item label="Средняя длина очереди">{response?.average_queue_len && Number.parseFloat(response.average_queue_len).toFixed(3)}</Descriptions.Item>
          </Descriptions>
        </Skeleton>
      </Col>
    </Row>
  );
}

export default ModellingVisualisation;
