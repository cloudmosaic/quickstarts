import "@patternfly/patternfly/base/patternfly-shield-inheritable.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import "@cloudmosaic/quickstarts/dist/quickstarts.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import { QuickStartCatalogPage } from "@cloudmosaic/quickstarts";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App>
            <h1>Quick starts demo app</h1>
            <p>Click the button above to open a quick start</p>
            <p>To view all quick starts, click the left "Quick Starts" nav item</p>
        </App>
      </Route>
      <Route exact path="/quickstarts">
        <App>
          <QuickStartCatalogPage />
        </App>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
