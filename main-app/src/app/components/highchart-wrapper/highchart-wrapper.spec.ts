import { HighchartWrapperComponent } from "./highchart-wrapper.component";
import {
    ComponentFixture,
    TestBed,
    waitForAsync,
} from "@angular/core/testing";
import { ChartSeriesData } from "../../model/chart-data.model";
import {
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
} from "@angular/core";

describe("HighchartWrapperComponent", () => {
    let component: HighchartWrapperComponent;
    let fixture: ComponentFixture<HighchartWrapperComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [HighchartWrapperComponent],
                imports: [
                ],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HighchartWrapperComponent);
        component = fixture.componentInstance;
        component.dataModel = {
            id: "1",
            xAxisName: "x",
            title: "title",
            data: new Map<string, ChartSeriesData>(),
        };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
