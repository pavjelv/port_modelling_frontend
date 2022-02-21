import {CustomerDataModel} from "app/models/customer-data.model";
import {ServerModel} from "app/models/server.model";

export enum CustomerState {
  WAITING = "gray",
  LEFT = "red",
  SERVING = "yellow",
  SERVED = "green",
}

export interface CustomerAnimationDataModel extends Omit<CustomerDataModel, "arrive" | "leave" | "serve"> {
  key?: string;
  customerState: CustomerState;
  serverNum?: number;
  queueNum?: number;
}

export interface AnimationPropertiesModel {
  servedCustomers: CustomerAnimationDataModel[];
  servingCustomers: CustomerAnimationDataModel[];
  queuedCustomers: CustomerAnimationDataModel[];
  rejectedCustomers: CustomerAnimationDataModel[];
  servers: ServerModel[];
}
