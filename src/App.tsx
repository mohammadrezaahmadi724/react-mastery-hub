import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Fundamentals from './pages/Fundamentals';
import AdvancedHooks from './pages/AdvancedHooks';
import Projects from './pages/Projects';
import './App.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="main-container">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fundamentals" element={<Fundamentals />} />
                <Route path="/advanced-hooks" element={<AdvancedHooks />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;