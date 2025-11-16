import React, { useState } from 'react';

// وظیفه: آموزش مدیریت state در React
// مثال‌ها:
// - state شیء (مدیریت کاربر)
// - state آرایه (لیست آیتم‌ها)
// - functional updates (شمارنده)

const StateExamples: React.FC = () => {
  const [user, setUser] = useState({ name: '', email: '', age: 0 });
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const updateUser = (field: string, value: string | number) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="state-examples">
      <h2>🎯 مدیریت State در React</h2>
      
      <div className="examples-grid">
        {/* Object State Example */}
        <div className="example-card">
          <h3>State شیء</h3>
          <div className="form-group">
            <label>نام:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => updateUser('name', e.target.value)}
              placeholder="نام کاربر"
            />
          </div>
          <div className="form-group">
            <label>ایمیل:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => updateUser('email', e.target.value)}
              placeholder="ایمیل کاربر"
            />
          </div>
          <div className="form-group">
            <label>سن:</label>
            <input
              type="number"
              value={user.age}
              onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
              placeholder="سن کاربر"
            />
          </div>
          <div className="user-preview">
            <h4>پیش‌نمایش کاربر:</h4>
            <p>نام: {user.name || '---'}</p>
            <p>ایمیل: {user.email || '---'}</p>
            <p>سن: {user.age || '---'}</p>
          </div>
        </div>

        {/* Array State Example */}
        <div className="example-card">
          <h3>State آرایه</h3>
          <div className="add-item-form">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="آیتم جدید"
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <button onClick={addItem} className="btn btn-primary">
              اضافه کردن
            </button>
          </div>
          
          <div className="items-list">
            {items.map((item, index) => (
              <div key={index} className="item">
                <span>{item}</span>
                <button 
                  onClick={() => removeItem(index)}
                  className="btn btn-sm btn-danger"
                >
                  حذف
                </button>
              </div>
            ))}
            
            {items.length === 0 && (
              <p className="empty-message">هیچ آیتمی وجود ندارد</p>
            )}
          </div>
        </div>

        {/* Functional Updates Example */}
        <div className="example-card">
          <h3>Functional Updates</h3>
          <CounterWithFunctionalUpdates />
        </div>
      </div>
    </div>
  );
};

// مثال Functional Updates
const CounterWithFunctionalUpdates: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  const incrementBy = (amount: number) => setCount(prev => prev + amount);

  return (
    <div className="functional-counter">
      <h4>شمارنده: {count}</h4>
      <div className="counter-controls">
        <button onClick={decrement} className="btn btn-danger">
          ➖
        </button>
        <button onClick={reset} className="btn btn-secondary">
          🔄
        </button>
        <button onClick={increment} className="btn btn-success">
          ➕
        </button>
      </div>
      <div className="batch-updates">
        <button onClick={() => incrementBy(5)} className="btn btn-primary">
          +5
        </button>
        <button onClick={() => incrementBy(10)} className="btn btn-primary">
          +10
        </button>
      </div>
    </div>
  );
};

export default StateExamples;