import * as React from "react";

import { Application } from "./application";

export class MainApplicationPlugin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Application systemVariables={this.props.systemVariables} eventBus={this.props.eventBus} globalNavigation={this.props.globalNavigation} basename={this.props.basename} />;
    }
}
