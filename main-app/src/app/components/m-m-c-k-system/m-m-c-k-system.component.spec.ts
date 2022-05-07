/* eslint-disable  @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { MathService } from "../../modules/mathjax/math.service";
import { ComponentsModule } from "../components.module";
import { MMCKSystemComponent } from "./m-m-c-k-system.component";

describe("MMCKSystemComponent", () => {
    let component: MMCKSystemComponent;
    let fixture: ComponentFixture<MMCKSystemComponent>;

    beforeEach(
        waitForAsync(() => {
            const mathService = jasmine.createSpyObj("MathService", ["renderContent", "render", "ready"]);
            mathService.renderContent.and.returnValue(null);
            mathService.render.and.returnValue(null);
            mathService.ready.and.returnValue(of(false));

            TestBed.configureTestingModule({
                declarations: [MMCKSystemComponent],
                imports: [
                    ComponentsModule,
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useClass: TranslateFakeLoader,
                        },
                    }),
                ],
                providers: [{ provide: MathService, useValue: mathService }],
                schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MMCKSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
