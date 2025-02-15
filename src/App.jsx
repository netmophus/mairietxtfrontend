import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Importer le Footer
import Routes from './routes/routes';

function App() {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur depuis le stockage local
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fonction de déconnexion
  const logoff = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar user={user} logoff={logoff} />
        <div style={{ flex: 1 }}>
          <Routes user={user} setUser={setUser} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;