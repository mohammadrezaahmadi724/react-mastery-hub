import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

// وظیفه: نوار کناری برای ناوبری
// قابلیت‌ها:
// - نمایش منوی navigation
// - نشان دادن پیشرفت کاربر
// - آمار سریع

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { state } = useApp();

  const menuItems = [
    { path: '/', label: '🏠 صفحه اصلی', icon: '🏠' },
    { path: '/fundamentals', label: '📚 اصول پایه', icon: '📚' },
    { path: '/advanced-hooks', label: '⚡ هوک‌های پیشرفته', icon: '⚡' },
    { path: '/projects', label: '💼 پروژه‌ها', icon: '💼' },
  ];

  const progress = (state.completedLessons.length / 20) * 100;

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="progress-section">
          <h3>پیشرفت شما</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {state.completedLessons.length} از 20 درس تکمیل شده
          </span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="quick-stats">
          <h4>آمار سریع</h4>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">{state.completedLessons.length}</span>
              <span className="stat-label">درس تکمیل شده</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {Math.round(progress)}%
              </span>
              <span className="stat-label">پیشرفت کلی</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;