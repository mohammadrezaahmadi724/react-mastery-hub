import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { state } = useApp();

  const features = [
    {
      icon: '📚',
      title: 'اصول پایه',
      description: 'یادگیری مفاهیم اساسی React و TypeScript',
      link: '/fundamentals'
    },
    {
      icon: '⚡',
      title: 'هوک‌های پیشرفته',
      description: 'مدیریت state و side effects با هوک‌های React',
      link: '/advanced-hooks'
    },
    {
      icon: '💼',
      title: 'پروژه‌های عملی',
      description: 'ساخت پروژه‌های واقعی برای تمرین',
      link: '/projects'
    },
    {
      icon: '🚀',
      title: 'آماده‌سازی برای تولید',
      description: 'Build، Deployment و Best Practices',
      link: '/projects'
    }
  ];

  return (
    <div className="page home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>به ReactMastery Hub خوش آمدید! 🎉</h1>
          <p className="hero-description">
            پلتفرم آموزشی تعاملی برای تسلط بر React و TypeScript
          </p>
          
          {state.user ? (
            <div className="welcome-user">
              <p>سلام <strong>{state.user.name}</strong>! 👋</p>
              <p>پیشرفت شما: <strong>{state.completedLessons.length} درس</strong> تکمیل شده</p>
            </div>
          ) : (
            <p>برای شروع یادگیری، وارد شوید و اولین درس را آغاز کنید!</p>
          )}
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <Link key={index} to={feature.link} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <span className="feature-link">شروع یادگیری →</span>
          </Link>
        ))}
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <h4>📖 تعداد دروس</h4>
          <span className="stat-number">20+</span>
        </div>
        <div className="stat-card">
          <h4>⚡ پروژه‌های عملی</h4>
          <span className="stat-number">5</span>
        </div>
        <div className="stat-card">
          <h4>🎯 مفاهیم پوشش داده شده</h4>
          <span className="stat-number">15+</span>
        </div>
        <div className="stat-card">
          <h4>🚀 سطح پیشرفت شما</h4>
          <span className="stat-number">
            {Math.round((state.completedLessons.length / 20) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;