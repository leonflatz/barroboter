// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ConfigurePage from './pages/ConfigurePage';
import type { JSX } from 'react/jsx-runtime';
import OrderPage from './pages/OrderPage';

function App(): JSX.Element {
  return (
    <Router>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/configure" element={<ConfigurePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<Navigate to="/configure" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
