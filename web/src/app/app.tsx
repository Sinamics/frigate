import { h } from 'preact';
import Routes from './routes';
import { DarkModeProvider, DrawerProvider } from '../context';
import { Suspense } from 'preact/compat';
import ActivityIndicator from '../components/ActivityIndicator';

const App = () => {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <DarkModeProvider>
        <DrawerProvider>
          <Routes />
        </DrawerProvider>
      </DarkModeProvider>
    </Suspense>
  );
};
export default App;
