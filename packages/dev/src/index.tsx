import "@patternfly/patternfly/base/patternfly-shield-inheritable.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/patternfly.scss";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import "@cloudmosaic/quickstarts/dist/quickstarts.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import { QuickStartCatalogPage } from "@cloudmosaic/quickstarts";
import { Home } from "./Home";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App>
          <Home />
        </App>
      </Route>
      <Route exact path="/quickstarts">
        <App>
          <QuickStartCatalogPage showFilter />
        </App>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
