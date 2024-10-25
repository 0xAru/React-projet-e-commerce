import Router from './Router'
import { useGlobalContext } from './context/GlobalContext';

function App() {
  const { isDarkMode } = useGlobalContext();
  return (
    <div className={`min-vh-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-300'}`}>
      <Router/>
    </div>
  )
}

export default App
