import { h, Fragment } from 'preact';
import LinkedLogo from './components/LinkedLogo';
import { Match } from 'preact-router/match';
import { memo } from 'preact/compat';
import { ENV } from './env';
import { useConfig } from './api';
import { useMemo } from 'preact/hooks';

import Events from './views/Events';

import ScrollMenu from './components/ScrollMenu';

const Sidebar = ({ children }) => {
  const { data: config } = useConfig();
  const cameras = useMemo(() => Object.entries(config.cameras), [config]);

  return (
    <Fragment>
      <ScrollMenu header={<Header />}>
        <Events />
      </ScrollMenu>

      {children}
    </Fragment>
  );
};

const Header = memo(() => {
  return (
    <div className="text-gray-500">
      <LinkedLogo />
    </div>
  );
});

export default Sidebar;
