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
  AllQuickStartStates,
  QuickStartContextValues,
  i18n,
} from "@cloudmosaic/quickstarts";
import { allQuickStarts } from "./quickstarts-data/quick-start-test-data";

interface AppState {
  activeItem: number | string;
  isNavOpen: boolean;
}

const NestedApp: React.FunctionComponent = () => {
  const [initialized, setInitialized] = React.useState(true);

  const allContext = React.useContext<QuickStartContextValues>(
    QuickStartContext
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

  const combinedContext = {
    ...allContext,
    allQuickStarts
  };
  console.log(combinedContext);

  // TODO - index doing router is not desired.
  // Split to App.tsx etc.
  return (
    <QuickStartContext.Provider value={combinedContext}>
      <QuickStartDrawer>
        <Page header={AppHeader} sidebar={AppSidebar} isManagedSidebar>
          <Button variant="plain" onClick={() => i18n.changeLanguage("de")}>
            Change lng - DE
          </Button>
          <Button variant="plain" onClick={() => i18n.changeLanguage("en")}>
            Change lng - EN
          </Button>
          <Button
            onClick={() =>
                combinedContext.setActiveQuickStart("add-healthchecks")
            }
          >
            Open quickstart
          </Button>
          <QuickStartCatalogPage />
        </Page>
      </QuickStartDrawer>
    </QuickStartContext.Provider>
  );
};
export default NestedApp;
