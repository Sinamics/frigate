import { h } from 'preact';
import Button from './Button';
import MenuIcon from '../icons/Menu';
import MoreIcon from '../icons/More';
import { useDrawer } from '../context';
import { useCallback } from 'preact/hooks';

export default function AppBar({ overflowRef, onOverflowClick }) {
  const { setShowDrawer } = useDrawer();

  const handleShowDrawer = useCallback(() => {
    setShowDrawer(true);
  }, [setShowDrawer]);

  return (
    <div
      id="appbar"
      className={`w-full border-b border-gray-200 p-2 dark:border-gray-700 flex items-center align-middle left-0 right-0 z-10 bg-white dark:bg-gray-900 transform transition-all duration-200 ${'translate-y-0'}`}
      data-testid="appbar"
    >
      <div className="lg:hidden">
        <Button color="black" className="rounded-full w-10 h-10" onClick={handleShowDrawer} type="text">
          <MenuIcon className="w-10 h-10" />
        </Button>
      </div>

      <div className="flex-grow-1 flex justify-end w-full">
        {overflowRef && onOverflowClick ? (
          <div className="w-auto" ref={overflowRef}>
            <Button
              aria-label="More options"
              color="black"
              className="rounded-full"
              onClick={onOverflowClick}
              type="text"
            >
              <MoreIcon className="w-6" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
