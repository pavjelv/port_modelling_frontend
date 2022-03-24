import { AfterContentInit, Component, ElementRef, Input, NgZone, OnDestroy } from "@angular/core";
import React from "react";
import ReactDOM from "react-dom";
import { ActivatedRoute, Data } from "@angular/router";
import { take } from "rxjs/operators";
import { FederationPlugin } from "../../model/microfrontends/microfrontend.model";
import { loadRemoteModule } from "@angular-architects/module-federation";

@Component({
    selector: "app-common-react-wrapper",
    template: "",
    styles: [":host {height: 100%;}"],
})
export class CommonReactWrapperComponent implements AfterContentInit, OnDestroy {
    propsInternal: Record<string, unknown>;

    @Input() set props(props: Record<string, unknown>) {
        this.propsInternal = props;
        this.updateComponentProps(props);
    }

    @Input() configuration: FederationPlugin;

    private reactMFEModule;

    constructor(private hostRef: ElementRef, private route: ActivatedRoute, private zone: NgZone) {}

    async ngAfterContentInit(): Promise<void> {
        if (!this.configuration) {
            this.route.data.pipe(take(1)).subscribe(async (data: Data) => {
                const configuration: FederationPlugin = data.configuration;
                await this.renderComponent(configuration, data.props);
            });
        }
    }

    private async renderComponent(configuration: FederationPlugin, props: Record<string, unknown>): Promise<void> {
        this.configuration = configuration;
        const component = await loadRemoteModule({
            remoteEntry: configuration.remoteEntry,
            remoteName: configuration.remoteName,
            exposedModule: configuration.exposedModule,
        });
        this.reactMFEModule = component[configuration.moduleClassName];
        this.zone.runOutsideAngular(() => {
            try {
                const ReactElement = React.createElement(
                    this.reactMFEModule,
                    this.constructProps({
                        ...props,
                        basename: this.configuration.routePath,
                    }),
                );
                ReactDOM.render(ReactElement, this.hostRef.nativeElement);
            } catch (error: unknown) {
                console.error(error);
            }
        });
    }

    ngOnDestroy(): void {
        ReactDOM.unmountComponentAtNode(this.hostRef.nativeElement);
    }

    private updateComponentProps(props: Record<string, unknown>): void {
        if (this.reactMFEModule) {
            this.zone.runOutsideAngular(() => {
                try {
                    const ReactElement = React.createElement(
                        this.reactMFEModule,
                        this.constructProps({
                            ...props,
                            basename: this.configuration.routePath,
                        }),
                    );
                    ReactDOM.hydrate(ReactElement, this.hostRef.nativeElement);
                } catch (error: unknown) {
                    console.log(error);
                }
            });
        }
    }

    private constructProps(routeProps): Record<string, unknown> {
        if (!routeProps) {
            routeProps = {};
        }
        if (!this.propsInternal) {
            this.propsInternal = {};
        }

        return { ...this.props, ...routeProps };
    }
}
