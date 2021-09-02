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
      <nav className="w-64 h-100 h-1/4 mb-auto overflow-y-auto p-2 space-y-2">{children}</nav>
    </Fragment>
  );
}
