import React from 'react';

// وظیفه: بخش پایینی برنامه
// محتوا:
// - اطلاعات پروژه
// - لینک‌های مفید
// - کپی رایت

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>ReactMastery Hub</h4>
          <p>پلتفرم آموزشی جامع React و TypeScript</p>
        </div>
        
        <div className="footer-section">
          <h4>لینک‌های مفید</h4>
          <ul>
            <li><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">مستندات React</a></li>
            <li><a href="https://typescript.org" target="_blank" rel="noopener noreferrer">مستندات TypeScript</a></li>
            <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">مستندات Vite</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>پروژه آموزشی</h4>
          <p>این پروژه برای گسترش دانش جامعه برنامه‌نویسی ساخته شده است</p>
          <div className="social-links">
            <span>⭐ در GitHub ستاره بدید</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>ساخته شده با ❤️ برای جامعه برنامه‌نویسی</p>
      </div>
    </footer>
  );
};

export default Footer;