import {CustomerDataModel} from "app/models/customer-data.model";
import {ServerModel} from "app/models/server.model";

export interface AnimationPropertiesModel {
  servedCustomers: CustomerDataModel[];
  servingCustomers: CustomerDataModel[];
  queuedCustomers: CustomerDataModel[];
  rejectedCustomers: CustomerDataModel[];
  servers: ServerModel[];
}
