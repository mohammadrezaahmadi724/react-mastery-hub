import { ReactNode } from 'react';

// وظیفه: تعریف انواع TypeScript
// انواع تعریف شده:
// - User: اطلاعات کاربر
// - Project: داده‌های پروژه
// - Lesson: اطلاعات درس
// - AppState: state کلی برنامه

export type { ReactNode };
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}



export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  progress: number;
  completed: boolean;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  language: 'fa' | 'en';
  completedLessons: number[];
}

