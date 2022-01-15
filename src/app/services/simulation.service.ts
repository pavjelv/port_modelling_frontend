import { Injectable } from "@angular/core";
import {Observable, of} from "rxjs";
import {ModellingResultModel} from "../model/modelling-result.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SimulationService {

  constructor(private httpClient: HttpClient) { }

  public getModellingResult(): Observable<ModellingResultModel> {
    return this.httpClient.get<ModellingResultModel>(`/api/modelling/poisson/`, {
      params: {
        serveTime: 2,
        lambda: 2,
        queueLength: 4,
        serversNum: 3,
        time: 20,
      }
    });
    // return of(SIMULATION_RESULT);
  }
}
