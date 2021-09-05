import { h } from 'preact';
import Button from './Button';
import MenuIcon from '../icons/Menu';
import MoreIcon from '../icons/More';
import { useDrawer } from '../context';
import { useLayoutEffect, useCallback, useState } from 'preact/hooks';
import ClipIcon from '../icons/Clip';
import SnapShotIcon from '../icons/Snapshot';
import Settings from '../icons/Settings';
import Debug from '../icons/Debug';
// We would typically preserve these in component state
// But need to avoid too many re-renders
let lastScrollY = window.scrollY;

export default function HeaderBar({ title: Title, overflowRef, onOverflowClick }) {
  const [show, setShow] = useState(true);
  const [atZero, setAtZero] = useState(window.scrollY === 0);
  const { setShowDrawer } = useDrawer();

  const scrollListener = useCallback(() => {
    const scrollY = window.scrollY;

    window.requestAnimationFrame(() => {
      setShow(scrollY <= 0 || lastScrollY > scrollY);
      setAtZero(scrollY === 0);
      lastScrollY = scrollY;
    });
  }, [setShow]);

  useLayoutEffect(() => {
    document.addEventListener('scroll', scrollListener);
    return () => {
      document.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);

  const handleShowDrawer = useCallback(() => {
    setShowDrawer(true);
  }, [setShowDrawer]);

  return (
    <div className={`flex z-10 bg-secondary-light dark:bg-gray-800`} data-testid="appbar">
      <div className="lg:hidden">
        <Button color="black" className="rounded-full w-12 h-12" onClick={handleShowDrawer} type="text">
          <MenuIcon className="w-10 h-10" />
        </Button>
      </div>
      <div className="flex justify-start items-center ml-1 w-full ">
        <div className="w-5 h-5 flex flex-1 space-x-1">
          <Settings className="hover:text-blue-300 cursor-pointer " />
          <ClipIcon className="hover:text-blue-300 cursor-pointer " />
          <SnapShotIcon className="hover:text-blue-300 cursor-pointer " />
          <Debug className="hover:text-blue-300 cursor-pointer " />
        </div>
      </div>
      <div className="flex justify-end w-full ">
        {overflowRef && onOverflowClick ? (
          <div className="w-auto" ref={overflowRef}>
            <Button
              aria-label="More options"
              color="black"
              className="rounded-full w-9 h-9"
              onClick={onOverflowClick}
              type="text"
            >
              <MoreIcon className="w-5 h-5" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
