import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import ClientBooking from './components/ClientBooking';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'schedule':
        return <Schedule />;
      case 'clientBooking':
        return <ClientBooking />;
      default:
        return <Home />;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="Лого сервера" className="logo" />
        <h1>Адміністрування Ігрового Серверу</h1>
        <nav>
          <ul>
            <li onClick={() => setCurrentPage('home')}>Головна сторінка</li>
            <li onClick={() => setCurrentPage('about')}>Про нас</li>
            <li onClick={() => setCurrentPage('schedule')}>Розклад</li>
            <li onClick={() => setCurrentPage('clientBooking')}>Запис клієнтів</li>
          </ul>
        </nav>
      </header>
      <main>{renderPage()}</main>
      {user ? (
        <div className="user-info">
          <span>Привіт, {user.name}! </span>
          <button className="logout-button" onClick={handleLogout}>
            Вийти
          </button>
        </div>
      ) : (
        <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
          Вхід/Реєстрація
        </button>
      )}
      {showForm && <RegisterForm onClose={() => setShowForm(false)} onRegister={setUser} />}
      <Footer />
    </div>
  );
}

export default App;