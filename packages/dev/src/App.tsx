import React from "react";
import {
  Page,
  Nav,
  NavList,
  NavItem,
  PageSection,
  SkipToContent,
  PageSidebar,
  Avatar,
  Brand,
  PageHeader,
  PageHeaderTools,
  Button,
} from "@patternfly/react-core";
import imgBrand from "./assets/images/imgBrand.svg";
import imgAvatar from "./assets/images/imgAvatar.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Demos from "./Demos";
import "./App.css";
import {
  QuickStartDrawer,
  QuickStartContext,
  QuickStartCatalogPage,
  useValuesForQuickStartContext,
} from "@cloudmosaic/quickstarts";

interface AppState {
  activeItem: number | string;
  isNavOpen: boolean;
}

const App: React.FunctionComponent = () => {
  const [initialized, setInitialized] = React.useState(true);

  const [activeQuickStartID, setActiveQuickStartID] = React.useState<string>(
    ""
  );

  const valuesForQuickstartContext = useValuesForQuickStartContext(
    activeQuickStartID,
    setActiveQuickStartID
  );

  if (!initialized) return <div>Loading</div>;

  const AppToolbar = (
    <PageHeaderTools>
      <Avatar src={imgAvatar} alt="Avatar image" />
    </PageHeaderTools>
  );

  const AppHeader = (
    <PageHeader
      logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
      headerTools={AppToolbar}
      showNavToggle
      isNavOpen
    />
  );

  const AppNav = (
    <Nav aria-label="Nav">
      <NavList>
        {Demos.map((demo, index) => (
          <NavItem itemId={index} key={demo.id}>
            <Link id={`${demo.id}-nav-item-link`} to={`/${demo.id}-nav-link`}>
              {demo.name}
            </Link>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );

  const AppSidebar = <PageSidebar isNavOpen nav={AppNav} />;

  // TODO - index doing router is not desired.
  // Split to App.tsx etc.
  return (
    <Router>
      <React.Suspense fallback={<div>Loading</div>}>
        <QuickStartContext.Provider value={valuesForQuickstartContext}>
          <QuickStartDrawer>
            <Page header={AppHeader} sidebar={AppSidebar} isManagedSidebar>
              <Button
                onClick={() =>
                  valuesForQuickstartContext.startQuickStart(
                    "explore-pipelines",
                    1
                  )
                }
              >
                Open quickstart
              </Button>
              <QuickStartCatalogPage />
            </Page>
          </QuickStartDrawer>
        </QuickStartContext.Provider>
      </React.Suspense>
    </Router>
  );
};
export default App;
