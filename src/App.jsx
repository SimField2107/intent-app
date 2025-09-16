import DashboardPage from './pages/DashboardPage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <DashboardPage />
    </AppProvider>
  );
}

export default App
