import { h } from 'preact';
import Routes from './routes';
import { DarkModeProvider, DrawerProvider } from '../context';

const App = () => {
  return (
    <DarkModeProvider>
      <DrawerProvider>
        <Routes />
      </DrawerProvider>
    </DarkModeProvider>
  );
};
export default App;
