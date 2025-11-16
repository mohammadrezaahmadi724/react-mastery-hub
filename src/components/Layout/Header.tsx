import React from 'react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🚀 ReactMastery Hub</h1>
        </div>
        
        <nav className="nav">
          <button 
            className="theme-toggle"
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          >
            {state.theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <select 
            value={state.language}
            onChange={(e) => dispatch({ 
              type: 'SET_LANGUAGE', 
              payload: e.target.value as 'fa' | 'en' 
            })}
            className="language-select"
          >
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>

          {state.user ? (
            <div className="user-info">
              <img src={state.user.avatar} alt={state.user.name} className="avatar" />
              <span>{state.user.name}</span>
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={() => dispatch({
                type: 'SET_USER',
                payload: {
                  id: 1,
                  name: 'یادگیرنده React',
                  email: 'learner@react.com',
                  avatar: '👨‍💻'
                }
              })}
            >
              ورود
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;