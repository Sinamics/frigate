import { h, Fragment } from 'preact';
import { Link } from 'preact-router/match';
import { useCallback } from 'preact/hooks';
import { useDrawer } from '../context';

export default function ScrollMenu({ children, header }) {
  const { showDrawer, setShowDrawer } = useDrawer();

  const handleDismiss = useCallback(() => {
    setShowDrawer(false);
  }, [setShowDrawer]);

  return (
    <Fragment>
      {showDrawer ? <div data-testid="scrim" key="scrim" className="fixed inset-0 z-20" onClick={handleDismiss} /> : ''}
      <div
        key="drawer"
        data-testid="drawer"
        className={`fixed left-0 top-0 bottom-0 max-h-screen lg:sticky flex flex-col w-64 text-gray-700 bg-white dark:text-gray-200 dark:bg-primary-dark flex-shrink-0 border-r border-gray-200 dark:border-gray-700 shadow lg:shadow-none z-20 lg:z-0`}
        onClick={handleDismiss}
      >
        {header ? (
          <div className="flex justify-center p-1 border-b border-gray-200 dark:border-gray-700 pr-5">{header}</div>
        ) : null}

        <nav className="flex flex-col items-end mb-auto h-2/4 overflow-y-auto p-2 space-y-2">{children}</nav>
      </div>
    </Fragment>
  );
}
