import {CustomerDataModel} from "./customer-data.model";

export interface SimulationResultModel {
  customer_data: CustomerDataModel[];
  average_queue_len: string;
  wait_system_time: string;
  wait_queue_time: string;
}
