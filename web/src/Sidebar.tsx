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
    <div className="border border-gray-600 w-56 h-screen overflow-hidden">
      <Header />
      <Events />
    </div>
  );
};

const Header = memo(() => {
  return (
    <div className="text-gray-500 flex items-center justify-center border-b p-1 border-gray-600">
      <LinkedLogo />
    </div>
  );
});

export default Sidebar;
