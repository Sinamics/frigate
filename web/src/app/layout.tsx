/* eslint-disable react-hooks/exhaustive-deps */
import { h, FunctionalComponent, JSX } from 'preact';
import ActivityIndicator from '../components/ActivityIndicator';

import { FetchStatus, useConfig } from '../api';
import Sidebar from '../Sidebar';
import Header from './header';

interface LayoutProps {
  children: JSX.Element;
}

export const LayoutPublic: FunctionalComponent<LayoutProps> = (props): JSX.Element => {
  const { status }: any = useConfig();
  return (
    <div
      data-testid="app"
      className="flex relative min-h-screen md:flex bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-white"
    >
      <Sidebar />

      {status !== FetchStatus.LOADED ? (
        <div className="flex flex-grow-1 min-h-screen justify-center items-center">
          <ActivityIndicator />
        </div>
      ) : (
        <div className="flex-1">
          <Header />
          <div className="m-5">{props.children}</div>
        </div>
      )}
    </div>
  );
};
