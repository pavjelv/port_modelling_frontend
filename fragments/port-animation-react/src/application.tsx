import { App } from "app/index";
import { EventBusService } from "app/models/mfe/event-bus.model";
import { GlobalNavigationService } from "app/models/mfe/global-navigation.model";
import { SystemVariablesModel } from "app/models/system-variables.model";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

export interface ApplicationProps {
    systemVariables?: SystemVariablesModel;
    eventBus?: EventBusService;
    globalNavigation?: GlobalNavigationService;
    basename?: string;
}

export class Application extends React.Component<ApplicationProps> {
    constructor(props: ApplicationProps) {
        super(props);
        console.log(props);
    }

    render(): React.ReactNode {
        return (
            <BrowserRouter basename={this.props.basename ?? ""}>
                <React.StrictMode>
                    <App systemVariables={this.props.systemVariables} />
                </React.StrictMode>
            </BrowserRouter>
        );
    }
}
