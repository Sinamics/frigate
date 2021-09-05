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
    <div className="border-r border-gray-600 border-gray-200 w-56 h-screen overflow-hidden ">
      <Header />
      <Events />
    </div>
  );
};

const Header = memo(() => {
  return (
    <div className="bg-secondary-light dark:bg-gray-800 text-gray-500 flex items-center justify-center p-1 ">
      <LinkedLogo />
    </div>
  );
});

export default Sidebar;
