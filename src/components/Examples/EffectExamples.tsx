import React, { useState, useEffect, useRef } from 'react';

// وظیفه: آموزش useEffect و side effects
// مثال‌ها:
// - تایمر با cleanup
// - شبیه‌سازی API call
// - ردیابی اندازه پنجره
// - ردیابی فشرده‌شدن کلیدها
const EffectExamples: React.FC = () => {
  const [activeExample, setActiveExample] = useState('timer');
  const [data, setData] = useState<any[]>([]);

  return (
    <div className="effect-examples">
      <h2>🎯 useEffect Examples</h2>
      
      <div className="example-tabs">
        <button 
          className={`tab-btn ${activeExample === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveExample('timer')}
        >
          ⏰ تایمر
        </button>
        <button 
          className={`tab-btn ${activeExample === 'api' ? 'active' : ''}`}
          onClick={() => setActiveExample('api')}
        >
          📡 شبیه‌سازی API
        </button>
        <button 
          className={`tab-btn ${activeExample === 'window' ? 'active' : ''}`}
          onClick={() => setActiveExample('window')}
        >
          🪟 اندازه پنجره
        </button>
        <button 
          className={`tab-btn ${activeExample === 'keypress' ? 'active' : ''}`}
          onClick={() => setActiveExample('keypress')}
        >
          ⌨️ ردیابی کیبورد
        </button>
      </div>

      <div className="example-content">
        {activeExample === 'timer' && <TimerExample />}
        {activeExample === 'api' && <ApiExample />}
        {activeExample === 'window' && <WindowSizeExample />}
        {activeExample === 'keypress' && <KeyPressExample />}
      </div>
    </div>
  );
};

// مثال ۱: تایمر با cleanup
const TimerExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const reset = () => {
    setCount(0);
    setIsRunning(false);
  };

  return (
    <div className="example-card">
      <h3>⏰ تایمر با useEffect</h3>
      <div className="timer-display">
        <span className="timer-count">{count}</span>
        <span>ثانیه</span>
      </div>
      <div className="timer-controls">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
        >
          {isRunning ? '⏸️ توقف' : '▶️ شروع'}
        </button>
        <button onClick={reset} className="btn btn-secondary">
          🔄 بازنشانی
        </button>
      </div>
      <div className="code-explanation">
        <h4>نحوه کارکرد:</h4>
        <ul>
          <li>useEffect برای مدیریت interval استفاده شده</li>
          <li>Cleanup function برای پاک کردن interval</li>
          <li>وابستگی به isRunning برای کنترل تایمر</li>
        </ul>
      </div>
    </div>
  );
};

// مثال ۲: شبیه‌سازی API
const ApiExample: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // شبیه‌سازی API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // داده‌های mock
        const mockUsers = [
          { id: 1, name: 'علی محمدی', email: 'ali@example.com' },
          { id: 2, name: 'سارا احمدی', email: 'sara@example.com' },
          { id: 3, name: 'محمد رضایی', email: 'mohammad@example.com' },
        ];
        
        setUsers(mockUsers);
      } catch (err) {
        setError('خطا در دریافت داده‌ها');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // آرایه وابستگی خالی - فقط یک بار اجرا می‌شود

  const refetch = () => {
    setUsers([]);
    // useEffect دوباره اجرا نمی‌شود چون وابستگی‌ها تغییر نکرده‌اند
    // برای اجرای مجدد باید state را تغییر دهیم
    window.location.reload(); // راه ساده برای نمایش
  };

  return (
    <div className="example-card">
      <h3>📡 شبیه‌سازی API Call</h3>
      
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>در حال دریافت داده‌ها...</p>
        </div>
      )}
      
      {error && (
        <div className="error-state">
          <p>❌ {error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div className="users-list">
          <h4>کاربران:</h4>
          {users.map(user => (
            <div key={user.id} className="user-item">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={refetch} className="btn btn-primary" disabled={loading}>
        🔄 دریافت مجدد داده‌ها
      </button>
      
      <div className="code-explanation">
        <h4>نکات مهم:</h4>
        <ul>
          <li>useEffect با آرایه وابستگی خالی فقط یک بار اجرا می‌شود</li>
          <li>مدیریت stateهای loading و error</li>
          <li>استفاده از async/await در useEffect</li>
        </ul>
      </div>
    </div>
  );
};

// مثال ۳: ردیابی اندازه پنجره
const WindowSizeExample: React.FC = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // اضافه کردن event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // وابستگی خالی - فقط یک بار setup می‌شود

  const getSizeCategory = () => {
    if (windowSize.width < 768) return 'موبایل';
    if (windowSize.width < 1024) return 'تبلت';
    return 'دسکتاپ';
  };

  return (
    <div className="example-card">
      <h3>🪟 ردیابی اندازه پنجره</h3>
      
      <div className="window-info">
        <div className="size-item">
          <label>عرض:</label>
          <span className="size-value">{windowSize.width}px</span>
        </div>
        <div className="size-item">
          <label>ارتفاع:</label>
          <span className="size-value">{windowSize.height}px</span>
        </div>
        <div className="size-item">
          <label>دسته‌بندی:</label>
          <span className="size-category">{getSizeCategory()}</span>
        </div>
      </div>
      
      <div className="resize-instruction">
        <p>📏 سایز پنجره را تغییر دهید تا مقادیر به روز شوند</p>
      </div>
      
      <div className="code-explanation">
        <h4>مکانیزم کار:</h4>
        <ul>
          <li>Event listener برای resize اضافه شده</li>
          <li>Cleanup function برای حذف listener</li>
          <li>به‌روزرسانی state بر اساس event</li>
        </ul>
      </div>
    </div>
  );
};

// مثال ۴: ردیابی فشرده‌شدن کلید
const KeyPressExample: React.FC = () => {
  const [key, setKey] = useState<string>('');
  const [keyHistory, setKeyHistory] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newKey = event.key;
      setKey(newKey);
      setKeyHistory(prev => [newKey, ...prev.slice(0, 9)]); // فقط 10 آیتم آخر
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const clearHistory = () => {
    setKeyHistory([]);
    setKey('');
  };

  return (
    <div className="example-card">
      <h3>⌨️ ردیابی فشرده‌شدن کلیدها</h3>
      
      <div className="key-display">
        <div className="current-key">
          <label>کلید فشرده شده:</label>
          <span className="key-value">{key || '---'}</span>
        </div>
      </div>
      
      <div className="key-history">
        <h4>تاریخچه کلیدها (۱۰ تای آخر):</h4>
        <div className="history-list">
          {keyHistory.map((keyItem, index) => (
            <span key={index} className="history-key">
              {keyItem}
            </span>
          ))}
          {keyHistory.length === 0 && (
            <p className="empty-message">هیچ کلیدی فشرده نشده است</p>
          )}
        </div>
      </div>
      
      <button onClick={clearHistory} className="btn btn-secondary">
        🗑️ پاک کردن تاریخچه
      </button>
      
      <div className="instruction">
        <p>⌨️ یک کلید روی کیبورد فشار دهید</p>
      </div>
      
      <div className="code-explanation">
        <h4>ویژگی‌ها:</h4>
        <ul>
          <li>Event listener برای keydown</li>
          <li>مدیریت تاریخچه با محدودیت تعداد</li>
          <li>Cleanup برای جلوگیری از memory leak</li>
        </ul>
      </div>
    </div>
  );
};

export default EffectExamples;