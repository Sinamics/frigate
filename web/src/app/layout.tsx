/* eslint-disable react-hooks/exhaustive-deps */
import { h, FunctionalComponent, JSX } from 'preact';
import ActivityIndicator from '../components/ActivityIndicator';
import { Suspense } from 'preact/compat';
import { FetchStatus, useConfig } from '../api';
import Sidebar from '../Sidebar';
import AppBar from '../AppBar';

interface LayoutProps {
  children: JSX.Element;
}

export const LayoutPublic: FunctionalComponent<LayoutProps> = (props): JSX.Element => {
  const { status }: any = useConfig();
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <div data-testid="app" className="w-full">
        {status !== FetchStatus.LOADED ? (
          <div className="flex flex-grow-1 min-h-screen justify-center items-center">
            <ActivityIndicator />
          </div>
        ) : (
          <div className="flex w-full bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-white">
            <Sidebar />
            <AppBar />
            <div>{props.children}</div>
          </div>
        )}
      </div>
    </Suspense>
  );
};
