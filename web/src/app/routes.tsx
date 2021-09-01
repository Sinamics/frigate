import { h, FunctionalComponent, JSX } from 'preact';
// import { lazy } from 'preact/compat';
import AsyncRoute from 'preact-async-route';
import { Router } from 'preact-router';
import * as Views from '../views';

// Layouts
import { LayoutPublic } from './layout';

const publicRoutes: any = [
  {
    key: 'homepage',
    path: '/',
    getComponent: Views.getCameras,
    // exact: true,
  },
];

interface PublicRouteProps {
  component: React.FC;
  path: string;
  exact: boolean;
}
const PublicRoute: any = (props): any => {
  const { getComponent: Component, ...restProps } = props;
  if (!Component) return <div />;

  return <AsyncRoute {...restProps} getComponent={Component} />;
};

const Routes: FunctionalComponent = (): JSX.Element => {
  return (
    <LayoutPublic>
      <Router>
        {publicRoutes.map((publicRouteProps: any) => (
          <PublicRoute {...publicRouteProps} />
        ))}
      </Router>
    </LayoutPublic>
  );
};

export default Routes;
