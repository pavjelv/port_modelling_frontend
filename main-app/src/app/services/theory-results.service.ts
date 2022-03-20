import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SystemVariablesModel } from "../model/theory/system-variables.model";
import { TheorySummaryModel } from "../model/theory/theory-summary.model";

@Injectable({
    providedIn: "root",
})
export class TheoryResultsService {
    constructor(private httpClient: HttpClient) {}

    public calculateWithQueue(values: SystemVariablesModel): Observable<TheorySummaryModel> {
        return this.httpClient.get<TheorySummaryModel>(`/api/calculate/theory/summary/`, {
            params: values as any,
        });
    }
    // ((sum (12 * 2.16)^i/i!,i=1 to 61) + 1)^(-1)

    // 1 - (12 * 2.16)^61 / 61! * ((sum (12 * 2.16)^i/i!,i=1 to 61) + 1)^(-1)

    // 21 - channels, 12 - lambda, 1- t
    // 1 - (12 * 1)^21 / 21! * ((sum (12 * 1)^i/i!,i=1 to 21) + 1)^(-1)

    // 1 - (7 * 2)^(2 + 4) / (2! * 2^4)* ((sum (7 * 2)^i/i!,i=1 to 2) + 1)^(-1)

    // L = \frac{P_0\rho^n(\frac{\rho}{n}-(m+1)(\frac{\rho}{n})^{n+1} + m(\frac{\rho}{n})^{m+2})}{n!(1 - \frac{\rho}{n})^2}
}
