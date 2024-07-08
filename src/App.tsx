import useMobileDetection from './hooks/useMobileDetection';
import { DesktopView, MobileView } from './components/ui';
import { useIsMobileStore } from './store/is-mobile-store';

function App() {
  const { isMobile } = useIsMobileStore();
  useMobileDetection();

  return <>{isMobile ? <MobileView /> : <DesktopView />}</>;
}

export default App;
