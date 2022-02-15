import * as React from "react";
import { hot } from "react-hot-loader";
import "./index.less";
import "semantic-ui-css/semantic.min.css";
import PortAnimation from "app/components/port-animation";
import {ApplicationProps} from "../application";
import "semantic-ui-css/semantic.min.css";
import {Switch, Route} from "react-router-dom";

export const App = hot(module)((props: ApplicationProps) => {
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
