import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SimulationResultModel } from "../model/simulation/simulation-result.model";
import { SimulationVariablesModel } from "../model/simulation/simulation-variables.model";

@Injectable({
    providedIn: "root",
})
export class SimulationService {
    constructor(private httpClient: HttpClient) {}

    public getModellingResult(variables: SimulationVariablesModel): Observable<SimulationResultModel> {
        return this.httpClient.get<SimulationResultModel>(`/api/calculate/modelling/poisson/`, {
            params: variables as any,
        });
    }

    public getModellingWithTypesResult(variables: SimulationVariablesModel): Observable<SimulationResultModel> {
        return this.httpClient.get<SimulationResultModel>(`/api/calculate/modelling/poissonWithTypes/`, {
            params: variables as any,
        });
    }
}
