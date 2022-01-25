import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SimulationResultModel} from "../model/simulation-result.model";

@Injectable({
  providedIn: "root"
})
export class SimulationService {

  constructor(private httpClient: HttpClient) { }

  public getModellingResult(): Observable<SimulationResultModel> {
    return this.httpClient.get<SimulationResultModel>(`/api/modelling/poisson/`, {
      params: {
        serveTime: 2,
        lambda: 2,
        queueLength: 4,
        serversNum: 3,
        time: 20,
      }
    });
  }
}
