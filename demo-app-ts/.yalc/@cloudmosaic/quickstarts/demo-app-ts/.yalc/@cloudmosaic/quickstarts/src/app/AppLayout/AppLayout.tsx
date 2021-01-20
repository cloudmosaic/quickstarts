import * as React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageHeaderTools,
  PageSidebar,
  SkipToContent,
  Button
} from '@patternfly/react-core';
import { IAppRoute, IAppRouteGroup, routes } from '@app/routes';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);

  const location = useLocation();

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  const { t } = useTranslation();

  function LogoImg() {
    const history = useHistory();

    function handleClick() {
      history.push('/');
    }

    return <Button onClick={handleClick} >Logo</Button>;
  }

  const Header = (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      aria-label={t('global_navigation')}
    />
  );

  const renderNavItem = (route: IAppRoute, index: number) => {
    return (
      <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`}>
        <NavLink exact to={route.path} activeClassName="pf-m-current">
          {route?.label && t(route.label)}
        </NavLink>
      </NavItem>
    );
  };

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
      // aria-label={t()}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  );

  const Navigation = (
    <Nav id="nav-primary-simple" role="navigation" theme="dark" aria-label={t('global')}>
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
        )}
      </NavList>
    </Nav>
  );
  const Sidebar = <PageSidebar theme="dark" nav={Navigation} isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />;
  const PageSkipToContent = <SkipToContent href="#primary-app-container">{t('skip_to_content')}</SkipToContent>;
  return (
    <Page
      mainContainerId="primary-app-container"
      role="main"
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}
    >
      {children}
    </Page>
  );
};

export { AppLayout };
