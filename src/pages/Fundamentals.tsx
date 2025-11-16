import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Counter from '../components/UI/Counter';
import StateExamples from '../components/Examples/StateExamples';

// وظیفه: آموزش اصول پایه React
// تب‌ها:
// - کامپوننت‌ها (Counter examples)
// - مدیریت state (StateExamples)
// - لیست دروس

const Fundamentals: React.FC = () => {
  const { dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('components');

  const lessons = [
    { id: 1, title: 'کامپوننت‌های تابعی', completed: false },
    { id: 2, title: 'JSX Syntax', completed: false },
    { id: 3, title: 'State و Props', completed: false },
    { id: 4, title: 'Event Handling', completed: false },
    { id: 5, title: 'useState Hook', completed: false },
    { id: 6, title: 'TypeScript Integration', completed: false },
  ];

  const completeLesson = (lessonId: number) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
  };

  return (
    <div className="page fundamentals-page">
      <div className="page-header">
        <h1>📚 اصول پایه React</h1>
        <p>یادگیری مفاهیم اساسی React با TypeScript</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'components' ? 'active' : ''}`}
          onClick={() => setActiveTab('components')}
        >
          کامپوننت‌ها
        </button>
        <button 
          className={`tab ${activeTab === 'state' ? 'active' : ''}`}
          onClick={() => setActiveTab('state')}
        >
          مدیریت State
        </button>
        <button 
          className={`tab ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          دروس
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'components' && (
          <div className="components-demo">
            <h2>کامپوننت‌های تعاملی</h2>
            <div className="demos-grid">
              <Counter initialValue={0} />
              <Counter initialValue={10} />
              <Counter initialValue={-5} />
            </div>
          </div>
        )}

        {activeTab === 'state' && (
          <StateExamples />
        )}

        {activeTab === 'lessons' && (
          <div className="lessons-list">
            <h2>دروس اصول پایه</h2>
            {lessons.map(lesson => (
              <div key={lesson.id} className="lesson-card">
                <h3>{lesson.title}</h3>
                <p>توضیحات کامل درباره {lesson.title}</p>
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

export default Fundamentals;