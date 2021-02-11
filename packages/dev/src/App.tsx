import React from "react";
import {
  Page,
  Nav,
  NavList,
  NavItem,
  PageSidebar,
  Avatar,
  Brand,
  PageHeader,
  PageHeaderTools,
  PageSection,
} from "@patternfly/react-core";
import imgBrand from "./assets/images/imgBrand.svg";
import imgAvatar from "./assets/images/imgAvatar.svg";
import { Link, useHistory } from "react-router-dom";
import Demos from "./Demos";
import "./App.css";
import {
  QuickStartDrawer,
  QuickStartContext,
  useValuesForQuickStartContext,
  useLocalStorage,
} from "@cloudmosaic/quickstarts";
import { allQuickStarts } from "./quickstarts-data/quick-start-test-data";

const App: React.FunctionComponent = ({ children }) => {
  const history = useHistory();

  const [initialized, setInitialized] = React.useState(true);

  const [activeQuickStartID, setActiveQuickStartID] = useLocalStorage(
    "quickstartId",
    ""
  );

  const [allQuickStartStates, setAllQuickStartStates] = useLocalStorage(
    "quickstarts",
    {}
  );

  React.useEffect(() => console.log(activeQuickStartID), [activeQuickStartID]);
  React.useEffect(() => {
    // callback on state change
    console.log(allQuickStartStates);
  }, [allQuickStartStates]);

  const { pathname: currentPath } = window.location;
  const quickStartPath = "/quickstarts";

  const valuesForQuickstartContext = useValuesForQuickStartContext({
    allQuickStarts,
    activeQuickStartID,
    setActiveQuickStartID,
    allQuickStartStates,
    setAllQuickStartStates,
    footer: {
      showAllLink: currentPath !== quickStartPath,
      onShowAllLinkClick: () => history.push(quickStartPath),
    },
  });

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
            <Link id={`${demo.id}-nav-item-link`} to={`/`}>
              {demo.name}
            </Link>
          </NavItem>
        ))}
        <NavItem>
          <Link to="/quickstarts">Quick Starts</Link>
        </NavItem>
      </NavList>
    </Nav>
  );

  const AppSidebar = <PageSidebar isNavOpen nav={AppNav} />;

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <QuickStartContext.Provider value={valuesForQuickstartContext}>
        <QuickStartDrawer>
          <Page header={AppHeader} sidebar={AppSidebar} isManagedSidebar>
            <PageSection>{children}</PageSection>
          </Page>
        </QuickStartDrawer>
      </QuickStartContext.Provider>
    </React.Suspense>
  );
};
export default App;
