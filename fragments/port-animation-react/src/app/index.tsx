import ModellingVisualisation from "app/components/modelling-visualisation";
import * as React from "react";
import "./index.less";
import { Route, Switch } from "react-router-dom";

import { ApplicationProps } from "../application";


export const App = (props: ApplicationProps) => {
    return (
        <div>
            <Switch>
                <Route path="/">
                    <ModellingVisualisation systemVariables={props.systemVariables} />
                </Route>
            </Switch>
        </div>
    );
};
