import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  refetch: () => void;
}

function useApi<T>(url: string): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // شبیه‌سازی API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // در حالت واقعی اینجا fetch می‌کنیم
      // const response = await fetch(url);
      // const data = await response.json();
      
      const mockData = {
        message: 'داده‌های دریافتی از API',
        timestamp: new Date().toISOString(),
        items: ['آیتم ۱', 'آیتم ۲', 'آیتم ۳']
      } as T;

      setState({
        data: mockData,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: 'خطا در دریافت داده‌ها'
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData
  };
}

export default useApi;