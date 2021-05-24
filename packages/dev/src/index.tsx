import "@patternfly/patternfly/base/patternfly-shield-inheritable.css";
import "@patternfly/patternfly/patternfly.min.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import "@cloudmosaic/quickstarts/dist/quickstarts.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import {
  QuickStartsLoader,
  QuickStartCatalogPage,
  QuickStart,
  LoadingBox,
} from "@cloudmosaic/quickstarts";
import { Home } from "./Home";
import { CustomCatalog } from "./CustomCatalog";

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
          <QuickStartsLoader>
            {(quickStarts: QuickStart[], loaded: boolean) =>
              loaded ? (
                <QuickStartCatalogPage
                  quickStarts={quickStarts}
                  showFilter
                  hint="Learn how to create, import, and run applications on OpenShift with step-by-step instructions and tasks."
                />
              ) : (
                <LoadingBox />
              )
            }
          </QuickStartsLoader>
        </App>
      </Route>
      <Route exact path="/custom-catalog">
        <App>
          <QuickStartsLoader>
            {(quickStarts: QuickStart[], loaded: boolean) =>
              loaded ? (
                <CustomCatalog quickStarts={quickStarts} />
              ) : (
                <LoadingBox />
              )
            }
          </QuickStartsLoader>
        </App>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
