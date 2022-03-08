import {CustomerDataModel} from "app/models/customer-data.model";

export interface SimulationResultModel {
  customer_data: CustomerDataModel[];
  models_summary: SystemSummary[];
}

export interface SystemSummary {
  average_queue_len: string;
  left_customers_number: string;
  name: string;
  served_customers_number: string;
  wait_queue_time: string;
  wait_system_time: string;
  idle_probability: string;
  reject_probability: string;
}
