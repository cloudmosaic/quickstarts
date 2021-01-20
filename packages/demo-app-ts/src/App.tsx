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
} from "@patternfly/react-core";
import imgBrand from "./assets/images/imgBrand.svg";
import imgAvatar from "./assets/images/imgAvatar.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Demos from "./Demos";
import "./App.css";
// @ts-ignore
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
              <QuickStartCatalogPage />
            </Page>
          </QuickStartDrawer>
        </QuickStartContext.Provider>
      </React.Suspense>
    </Router>
  );
};
export default App;

// class App extends React.Component<{}, AppState> {
//   state: AppState = {
//     activeItem: "",
//     isNavOpen: true,
//   };

//   private onNavSelect = (selectedItem: { itemId: number | string }) => {
//     this.setState({ activeItem: selectedItem.itemId });
//   };

//   private getNav = () => {
//     const { activeItem } = this.state;
//     return (
//       <Nav onSelect={this.onNavSelect} aria-label="Nav">
//         <NavList>
//           {Demos.map((demo, index) => (
//             <NavItem
//               itemId={index}
//               isActive={activeItem === index}
//               key={demo.id}
//             >
//               <Link id={`${demo.id}-nav-item-link`} to={`/${demo.id}-nav-link`}>
//                 {demo.name}
//               </Link>
//             </NavItem>
//           ))}
//         </NavList>
//       </Nav>
//     );
//   };

//   private getPages = () => (
//     <React.Fragment>
//       {Demos.map((demo) => (
//         <Route
//           path={`/${demo.id}-nav-link`}
//           render={() => (
//             <PageSection style={{ zIndex: 2 }} id={`/${demo.id}-page-section`}>
//               {React.createElement(demo.componentType)}
//             </PageSection>
//           )}
//           key={demo.id}
//         />
//       ))}
//     </React.Fragment>
//   );

//   private pageId = "ts-demo-app-page-id";
//   private getSkipToContentLink = () => (
//     <SkipToContent href={`#${this.pageId}`}>Skip to Content</SkipToContent>
//   );

//   render() {
//     const { isNavOpen } = this.state;

//     const AppToolbar = (
//       <PageHeaderTools>
//         <Avatar src={imgAvatar} alt="Avatar image" />
//       </PageHeaderTools>
//     );

//     const AppHeader = (
//       <PageHeader
//         logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
//         headerTools={AppToolbar}
//         showNavToggle
//         isNavOpen={isNavOpen}
//         onNavToggle={() => this.setState({ isNavOpen: !isNavOpen })}
//       />
//     );

//     const AppSidebar = (
//       <PageSidebar isNavOpen={isNavOpen} nav={this.getNav()} />
//     );

//     return (
//       <Router>
//         <QuickStartContext.Provider value={valuesForQuickstartContext}>
//           <QuickStartDrawer>
//             <Page
//               header={AppHeader}
//               sidebar={AppSidebar}
//               skipToContent={this.getSkipToContentLink()}
//               isManagedSidebar
//               mainContainerId={this.pageId}
//             >
//               Content
//               {/* {this.getPages()} */}
//             </Page>
//           </QuickStartDrawer>
//         </QuickStartContext.Provider>
//       </Router>
//     );
//   }
// }

// export default App;
