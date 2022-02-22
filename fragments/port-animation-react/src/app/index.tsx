import * as React from "react";
import "./index.less";
import PortAnimation from "app/components/port-animation";
import {ApplicationProps} from "../application";
import {Switch, Route} from "react-router-dom";

export const App = ((props: ApplicationProps) => {
    return (
      <div>
        <Switch>
          <Route path="/">
            <PortAnimation systemVariables={props.systemVariables}/>
          </Route>
        </Switch>
      </div>
    );
  })
;
