import { h } from 'preact';
import Heading from './Heading';
import Logo from './Logo';

export default function LinkedLogo() {
  return (
    <Heading size="lg">
      <a className="transition-colors flex items-center space-x-5 hover:text-blue-500 relative" href="/">
        <Logo className="w-10" />
        <p>Frigate</p>
      </a>
    </Heading>
  );
}
