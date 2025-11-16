import React, { createContext, useContext, useState, ReactNode } from 'react';

// وظیفه: آموزش useContext و مدیریت state سراسری
// مثال‌ها:
// - مدیریت کاربر
// - تنظیمات برنامه
// - سبد خرید
// - کامپوننت‌های تو در تو

// انواع (Types)
interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AppSettings {
  theme: 'light' | 'dark';
  language: 'fa' | 'en';
  notifications: boolean;
}

interface AppState {
  user: User | null;
  settings: AppSettings;
  cart: string[];
}

interface AppContextType {
  state: AppState;
  login: (user: User) => void;
  logout: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  addToCart: (item: string) => void;
  removeFromCart: (item: string) => void;
}

// ایجاد Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook برای استفاده از Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider کامپوننت
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    settings: {
      theme: 'light',
      language: 'fa',
      notifications: true
    },
    cart: []
  });

  const login = (user: User) => {
    setState(prev => ({ ...prev, user }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, user: null, cart: [] }));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const addToCart = (item: string) => {
    setState(prev => ({
      ...prev,
      cart: [...prev.cart, item]
    }));
  };

  const removeFromCart = (item: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(cartItem => cartItem !== item)
    }));
  };

  const value: AppContextType = {
    state,
    login,
    logout,
    updateSettings,
    addToCart,
    removeFromCart
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// کامپوننت اصلی مثال‌ها
const ContextExamples: React.FC = () => {
  const [activeExample, setActiveExample] = useState('user');

  return (
    <AppProvider>
      <div className="context-examples">
        <h2>🎯 useContext Examples</h2>
        
        <div className="example-tabs">
          <button 
            className={`tab-btn ${activeExample === 'user' ? 'active' : ''}`}
            onClick={() => setActiveExample('user')}
          >
            👤 مدیریت کاربر
          </button>
          <button 
            className={`tab-btn ${activeExample === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveExample('settings')}
          >
            ⚙️ تنظیمات
          </button>
          <button 
            className={`tab-btn ${activeExample === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveExample('cart')}
          >
            🛒 سبد خرید
          </button>
          <button 
            className={`tab-btn ${activeExample === 'nested' ? 'active' : ''}`}
            onClick={() => setActiveExample('nested')}
          >
            🏗️ کامپوننت‌های تو در تو
          </button>
        </div>

        <div className="example-content">
          {activeExample === 'user' && <UserExample />}
          {activeExample === 'settings' && <SettingsExample />}
          {activeExample === 'cart' && <CartExample />}
          {activeExample === 'nested' && <NestedComponentsExample />}
        </div>
      </div>
    </AppProvider>
  );
};

// مثال ۱: مدیریت کاربر
const UserExample: React.FC = () => {
  const { state, login, logout } = useAppContext();

  const handleLogin = () => {
    login({
      id: 1,
      name: 'علی محمدی',
      email: 'ali@example.com',
      role: 'admin'
    });
  };

  return (
    <div className="example-card">
      <h3>👤 مدیریت وضعیت کاربر</h3>
      
      <div className="user-info">
        {state.user ? (
          <div className="logged-in">
            <div className="user-details">
              <h4>کاربر فعلی:</h4>
              <p><strong>نام:</strong> {state.user.name}</p>
              <p><strong>ایمیل:</strong> {state.user.email}</p>
              <p><strong>نقش:</strong> {state.user.role}</p>
            </div>
            <button onClick={logout} className="btn btn-danger">
              🚪 خروج
            </button>
          </div>
        ) : (
          <div className="logged-out">
            <p>هیچ کاربری وارد نشده است</p>
            <button onClick={handleLogin} className="btn btn-success">
              🔐 ورود به سیستم
            </button>
          </div>
        )}
      </div>
      
      <div className="code-explanation">
        <h4>مزایای استفاده از Context:</h4>
        <ul>
          <li>دسترسی به state کاربر در تمام کامپوننت‌ها</li>
          <li>عدم نیاز به prop drilling</li>
          <li>مدیریت متمرکز وضعیت کاربر</li>
        </ul>
      </div>
    </div>
  );
};

// مثال ۲: مدیریت تنظیمات
const SettingsExample: React.FC = () => {
  const { state, updateSettings } = useAppContext();

  const toggleTheme = () => {
    updateSettings({
      theme: state.settings.theme === 'light' ? 'dark' : 'light'
    });
  };

  const toggleLanguage = () => {
    updateSettings({
      language: state.settings.language === 'fa' ? 'en' : 'fa'
    });
  };

  const toggleNotifications = () => {
    updateSettings({
      notifications: !state.settings.notifications
    });
  };

  return (
    <div className="example-card">
      <h3>⚙️ مدیریت تنظیمات برنامه</h3>
      
      <div className="settings-list">
        <div className="setting-item">
          <label>تم:</label>
          <span className="setting-value">
            {state.settings.theme === 'light' ? '☀️ روشن' : '🌙 تاریک'}
          </span>
          <button onClick={toggleTheme} className="btn btn-primary">
            تغییر تم
          </button>
        </div>
        
        <div className="setting-item">
          <label>زبان:</label>
          <span className="setting-value">
            {state.settings.language === 'fa' ? '🇮🇷 فارسی' : '🇺🇸 انگلیسی'}
          </span>
          <button onClick={toggleLanguage} className="btn btn-primary">
            تغییر زبان
          </button>
        </div>
        
        <div className="setting-item">
          <label>نوتیفیکیشن:</label>
          <span className="setting-value">
            {state.settings.notifications ? '🔔 فعال' : '🔕 غیرفعال'}
          </span>
          <button onClick={toggleNotifications} className="btn btn-primary">
            {state.settings.notifications ? 'غیرفعال' : 'فعال'}
          </button>
        </div>
      </div>
      
      <div className="current-settings">
        <h4>تنظیمات فعلی:</h4>
        <pre>{JSON.stringify(state.settings, null, 2)}</pre>
      </div>
    </div>
  );
};

// مثال ۳: سبد خرید
const CartExample: React.FC = () => {
  const { state, addToCart, removeFromCart } = useAppContext();
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      addToCart(newItem);
      setNewItem('');
    }
  };

  const availableItems = ['کتاب React', 'ماوس گیمینگ', 'کیبورد مکانیکی', 'مانیتور ۲۴ اینچ'];

  return (
    <div className="example-card">
      <h3>🛒 مدیریت سبد خرید</h3>
      
      <div className="cart-management">
        <div className="add-item-section">
          <h4>افزودن آیتم جدید:</h4>
          <div className="add-item-form">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="نام آیتم..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <button onClick={handleAddItem} className="btn btn-success">
              ➕ افزودن
            </button>
          </div>
          
          <div className="quick-items">
            <h5>آیتم‌های سریع:</h5>
            <div className="quick-buttons">
              {availableItems.map(item => (
                <button
                  key={item}
                  onClick={() => addToCart(item)}
                  className="btn btn-sm btn-outline"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="cart-items">
          <h4>آیتم‌های سبد خرید ({state.cart.length}):</h4>
          {state.cart.length === 0 ? (
            <p className="empty-message">سبد خرید خالی است</p>
          ) : (
            <div className="items-list">
              {state.cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item}</span>
                  <button 
                    onClick={() => removeFromCart(item)}
                    className="btn btn-sm btn-danger"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// مثال ۴: کامپوننت‌های تو در تو
const NestedComponentsExample: React.FC = () => {
  return (
    <div className="example-card">
      <h3>🏗️ کامپوننت‌های تو در تو با Context</h3>
      
      <div className="nested-demo">
        <p>این مثال نشان می‌دهد چگونه Context از prop drilling جلوگیری می‌کند:</p>
        
        <div className="component-tree">
          <Level1Component />
        </div>
      </div>
    </div>
  );
};

const Level1Component: React.FC = () => {
  const { state } = useAppContext();
  
  return (
    <div className="component-level level1">
      <h4>Level 1 - Parent Component</h4>
      <p>کاربر: {state.user?.name || 'ناشناس'}</p>
      <Level2Component />
    </div>
  );
};

const Level2Component: React.FC = () => {
  const { state } = useAppContext();
  
  return (
    <div className="component-level level2">
      <h4>Level 2 - Child Component</h4>
      <p>تعداد آیتم‌های سبد: {state.cart.length}</p>
      <Level3Component />
    </div>
  );
};

const Level3Component: React.FC = () => {
  const { state, login, logout } = useAppContext();
  
  return (
    <div className="component-level level3">
      <h4>Level 3 - Grandchild Component</h4>
      <p>تم: {state.settings.theme}</p>
      <p>زبان: {state.settings.language}</p>
      
      <div className="action-buttons">
        {state.user ? (
          <button onClick={logout} className="btn btn-sm btn-danger">
            خروج از این سطح
          </button>
        ) : (
          <button 
            onClick={() => login({
              id: 1,
              name: 'کاربر تست',
              email: 'test@example.com',
              role: 'user'
            })} 
            className="btn btn-sm btn-success"
          >
            ورود از این سطح
          </button>
        )}
      </div>
    </div>
  );
};

export default ContextExamples;