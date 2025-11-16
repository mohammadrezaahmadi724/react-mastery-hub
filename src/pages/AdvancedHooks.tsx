import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';

const AdvancedHooks: React.FC = () => {
  const { dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('useEffect');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const counterRef = useRef<number>(0);

  // useEffect Examples
  useEffect(() => {
    // Effect for window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Effect for API simulation
    if (activeTab === 'useEffect') {
      setLoading(true);
      setTimeout(() => {
        setData([
          { id: 1, name: 'آیتم ۱', value: Math.random() },
          { id: 2, name: 'آیتم ۲', value: Math.random() },
          { id: 3, name: 'آیتم ۳', value: Math.random() }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [activeTab]);

  // useMemo Examples
  const expensiveCalculation = useMemo(() => {
    console.log('انجام محاسبات سنگین...');
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  // useCallback Examples
  const handleItemClick = useCallback((itemId: number) => {
    alert(`آیتم ${itemId} کلیک شد!`);
  }, []);

  const incrementRef = useCallback(() => {
    counterRef.current += 1;
    console.log('مقدار ref:', counterRef.current);
  }, []);

  // useRef Examples
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const lessons = [
    { id: 11, title: 'useEffect - مدیریت Side Effects', completed: false },
    { id: 12, title: 'useMemo - بهینه‌سازی عملکرد', completed: false },
    { id: 13, title: 'useCallback - بهینه‌سازی توابع', completed: false },
    { id: 14, title: 'useRef - دسترسی مستقیم به DOM', completed: false },
    { id: 15, title: 'Custom Hooks - هوک‌های سفارشی', completed: false },
  ];

  const completeLesson = (lessonId: number) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
  };

  return (
    <div className="page advanced-hooks-page">
      <div className="page-header">
        <h1>⚡ هوک‌های پیشرفته React</h1>
        <p>مدیریت state پیچیده و بهینه‌سازی عملکرد</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'useEffect' ? 'active' : ''}`}
          onClick={() => setActiveTab('useEffect')}
        >
          useEffect
        </button>
        <button 
          className={`tab ${activeTab === 'useMemo' ? 'active' : ''}`}
          onClick={() => setActiveTab('useMemo')}
        >
          useMemo
        </button>
        <button 
          className={`tab ${activeTab === 'useCallback' ? 'active' : ''}`}
          onClick={() => setActiveTab('useCallback')}
        >
          useCallback
        </button>
        <button 
          className={`tab ${activeTab === 'useRef' ? 'active' : ''}`}
          onClick={() => setActiveTab('useRef')}
        >
          useRef
        </button>
        <button 
          className={`tab ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          دروس
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'useEffect' && (
          <div className="hook-demo">
            <h2>🎯 useEffect - مدیریت Side Effects</h2>
            
            <div className="demo-grid">
              <div className="demo-card">
                <h3>اندازه پنجره</h3>
                <p>عرض: {windowSize.width}px</p>
                <p>ارتفاع: {windowSize.height}px</p>
                <small>سایز پنجره را تغییر دهید</small>
              </div>

              <div className="demo-card">
                <h3>شبیه‌سازی API</h3>
                {loading ? (
                  <p>📡 در حال بارگذاری...</p>
                ) : (
                  <div>
                    {data.map(item => (
                      <div key={item.id} className="data-item">
                        {item.name}: {item.value.toFixed(2)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="demo-card">
                <h3>Cleanup Function</h3>
                <p>event listener هنگام unmount پاک می‌شود</p>
                <button onClick={() => setWindowSize({ width: 0, height: 0 })}>
                  Reset Size
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'useMemo' && (
          <div className="hook-demo">
            <h2>💾 useMemo - بهینه‌سازی محاسبات سنگین</h2>
            
            <div className="demo-grid">
              <div className="demo-card">
                <h3>محاسبه سنگین</h3>
                <p>مجموع مقادیر: {expensiveCalculation.toFixed(2)}</p>
                <small>مقدار فقط وقتی تغییر می‌کند که data تغییر کند</small>
              </div>

              <div className="demo-card">
                <h3>لیست داده‌ها</h3>
                {data.map(item => (
                  <div key={item.id} className="data-item">
                    {item.name}: {item.value.toFixed(2)}
                  </div>
                ))}
                <button onClick={() => setData(prev => [...prev, {
                  id: prev.length + 1,
                  name: `آیتم ${prev.length + 1}`,
                  value: Math.random()
                }])}>
                  اضافه کردن آیتم
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'useCallback' && (
          <div className="hook-demo">
            <h2>🔄 useCallback - بهینه‌سازی توابع</h2>
            
            <div className="demo-grid">
              <div className="demo-card">
                <h3>توابع بهینه‌شده</h3>
                <div className="data-list">
                  {data.map(item => (
                    <div 
                      key={item.id}
                      className="data-item clickable"
                      onClick={() => handleItemClick(item.id)}
                    >
                      کلیک کن: {item.name}
                    </div>
                  ))}
                </div>
                <small>تابع handleItemClick فقط یک بار ایجاد می‌شود</small>
              </div>

              <div className="demo-card">
                <h3>useRef با useCallback</h3>
                <p>مقدار ref: {counterRef.current}</p>
                <button onClick={incrementRef}>
                  افزایش مقدار ref
                </button>
                <small>مقدار در کنسول لاگ می‌شود</small>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'useRef' && (
          <div className="hook-demo">
            <h2>🎯 useRef - دسترسی مستقیم به DOM</h2>
            
            <div className="demo-grid">
              <div className="demo-card">
                <h3>Focus روی Input</h3>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="این input با ref کنترل می‌شود"
                  className="ref-input"
                />
                <button onClick={focusInput} className="btn btn-primary">
                  فوکس روی Input
                </button>
              </div>

              <div className="demo-card">
                <h3>مقدار mutable</h3>
                <p>مقدار کنونی: {counterRef.current}</p>
                <button onClick={incrementRef} className="btn btn-secondary">
                  افزایش بدون رندر مجدد
                </button>
                <small>مقدار تغییر می‌کند اما کامپوننت رندر نمی‌شود</small>
              </div>

              <div className="demo-card">
                <h3>Interval با useRef</h3>
                <CounterWithInterval />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="lessons-list">
            <h2>دروس هوک‌های پیشرفته</h2>
            {lessons.map(lesson => (
              <div key={lesson.id} className="lesson-card">
                <h3>{lesson.title}</h3>
                <p>یادگیری عمیق {lesson.title} با مثال‌های عملی</p>
                <button 
                  className="complete-btn"
                  onClick={() => completeLesson(lesson.id)}
                >
                  ✅ تکمیل درس
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// کامپوننت مثال برای useRef + useEffect
const CounterWithInterval: React.FC = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    if (intervalRef.current) return;
    
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="interval-counter">
      <h4>شمارنده: {count}</h4>
      <div className="interval-controls">
        <button onClick={startInterval} className="btn btn-success">
          شروع
        </button>
        <button onClick={stopInterval} className="btn btn-danger">
          توقف
        </button>
      </div>
    </div>
  );
};

export default AdvancedHooks;