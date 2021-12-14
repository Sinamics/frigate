/* eslint-disable react-hooks/exhaustive-deps */
import { h, FunctionalComponent, JSX } from 'preact';
import ActivityIndicator from '../components/ActivityIndicator';

import { FetchStatus, useConfig } from '../api';
import Sidebar from '../Sidebar';
import Header from './header';
import Timeline from '../components/Timeline';
interface LayoutProps {
  children: JSX.Element;
}

export const LayoutPublic: FunctionalComponent<LayoutProps> = (props): JSX.Element => {
  // console.log(props);
  const { status }: any = useConfig();
  return (
    <div
      data-testid="app"
      className="min-h-screen md:flex bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-white"
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
          <Timeline />
        </div>
      )}
    </div>
  );
};
