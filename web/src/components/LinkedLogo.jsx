import { h } from 'preact';
import Heading from './Heading';
import Logo from './Logo';

export default function LinkedLogo() {
  return (
    <Heading size="lg">
      <a className="transition-colors flex items-center dark:text-white hover:text-blue-500" href="/">
        <div className="">
          <Logo />
        </div>
        Frigate
      </a>
    </Heading>
  );
}
