import * as React from "react";
import "./index.less";
import {ApplicationProps} from "../application";
import {Switch, Route} from "react-router-dom";
import ModellingVisualisation from 'app/components/modelling-visualisation';

export const App = ((props: ApplicationProps) => {
    return (
      <div>
        <Switch>
          <Route path="/">
            <ModellingVisualisation systemVariables={props.systemVariables}/>
          </Route>
        </Switch>
      </div>
    );
  })
;
