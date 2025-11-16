import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';

// وظیفه: مدیریت پروژه‌های تمرینی
// قابلیت‌ها:
// - افزودن پروژه جدید
// - ردیابی پیشرفت
// - راهنمای step-by-step

const Projects: React.FC = () => {
  const { state, dispatch } = useApp();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Todo App پیشرفته',
      description: 'یک برنامه مدیریت کارها با قابلیت‌های پیشرفته',
      technologies: ['React', 'TypeScript', 'LocalStorage', 'CSS3'],
      progress: 85,
      completed: false
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'داشبورد آب و هوا با نمودارهای تعاملی',
      technologies: ['React', 'API Integration', 'Chart.js', 'Tailwind'],
      progress: 60,
      completed: false
    },
    {
      id: 3,
      title: 'E-commerce Store',
      description: 'فروشگاه آنلاین با سبد خرید و درگاه پرداخت',
      technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
      progress: 40,
      completed: false
    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'شبکه اجتماعی با قابلیت چت و اشتراک‌گذاری',
      technologies: ['React', 'Firebase', 'WebSockets', 'PWA'],
      progress: 25,
      completed: false
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'وبسایت شخصی با انیمیشن‌های پیشرفته',
      technologies: ['React', 'Framer Motion', 'Three.js', 'GSAP'],
      progress: 100,
      completed: true
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: ''
  });

  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const project: Project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()),
        progress: 0,
        completed: false
      };
      
      setProjects(prev => [project, ...prev]);
      setNewProject({ title: '', description: '', technologies: '' });
    }
  };

  const updateProgress = (projectId: number, progress: number) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId 
        ? { 
            ...project, 
            progress: Math.max(0, Math.min(100, progress)),
            completed: progress === 100
          }
        : project
    ));
  };

  const deleteProject = (projectId: number) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const completedProjects = projects.filter(p => p.completed).length;
  const totalProgress = projects.reduce((sum, project) => sum + project.progress, 0) / projects.length;

  return (
    <div className="page projects-page">
      <div className="page-header">
        <h1>💼 پروژه‌های عملی</h1>
        <p>ساخت پروژه‌های واقعی برای تقویت مهارت‌های React</p>
      </div>

      {/* آمار کلی */}
      <div className="projects-stats">
        <div className="stat-card">
          <h3>📊 آمار پروژه‌ها</h3>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">کل پروژه‌ها</span>
            </div>
            <div className="stat">
              <span className="stat-number">{completedProjects}</span>
              <span className="stat-label">تکمیل شده</span>
            </div>
            <div className="stat">
              <span className="stat-number">{Math.round(totalProgress)}%</span>
              <span className="stat-label">میانگین پیشرفت</span>
            </div>
          </div>
        </div>
      </div>

      {/* فرم اضافه کردن پروژه جدید */}
      <div className="add-project-form">
        <h3>➕ افزودن پروژه جدید</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="عنوان پروژه"
            value={newProject.title}
            onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
            className="form-input"
          />
          <input
            type="text"
            placeholder="توضیحات پروژه"
            value={newProject.description}
            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            className="form-input"
          />
          <input
            type="text"
            placeholder="تکنولوژی‌ها (با کاما جدا کنید)"
            value={newProject.technologies}
            onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
            className="form-input"
          />
          <button onClick={addProject} className="btn btn-primary">
            اضافه کردن پروژه
          </button>
        </div>
      </div>

      {/* فیلترها */}
      <div className="project-filters">
        <button className="filter-btn active">همه پروژه‌ها</button>
        <button className="filter-btn">در حال انجام</button>
        <button className="filter-btn">تکمیل شده</button>
      </div>

      {/* لیست پروژه‌ها */}
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdateProgress={updateProgress}
            onDelete={deleteProject}
          />
        ))}
      </div>

      {/* راهنمای پروژه‌ها */}
      <div className="projects-guide">
        <h3>🎯 راهنمای یادگیری از طریق پروژه</h3>
        <div className="guide-steps">
          <div className="step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>پروژه‌های پایه</h4>
              <p>با Todo App و Calculator شروع کنید</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>یکپارچه‌سازی API</h4>
              <p>پروژه‌های Weather App و Blog</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>State Management</h4>
              <p>E-commerce و Social Media Apps</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <div className="step-content">
              <h4>پروژه‌های Full-stack</h4>
              <p>پروژه‌های کامل با Backend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// کامپوننت کارت پروژه
interface ProjectCardProps {
  project: Project;
  onUpdateProgress: (id: number, progress: number) => void;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onUpdateProgress, 
  onDelete 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`project-card ${project.completed ? 'completed' : ''}`}>
      <div className="project-header">
        <h3>{project.title}</h3>
        <div className="project-actions">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-sm btn-secondary"
          >
            {showDetails ? '▲' : '▼'}
          </button>
          <button 
            onClick={() => onDelete(project.id)}
            className="btn btn-sm btn-danger"
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{project.progress}%</span>
      </div>

      <div className="project-technologies">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      {showDetails && (
        <div className="project-details">
          <div className="progress-controls">
            <label>پیشرفت پروژه:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={project.progress}
              onChange={(e) => onUpdateProgress(project.id, parseInt(e.target.value))}
              className="progress-slider"
            />
            <span>{project.progress}%</span>
          </div>

          <div className="detail-actions">
            <button 
              onClick={() => onUpdateProgress(project.id, project.progress - 10)}
              disabled={project.progress <= 0}
              className="btn btn-sm btn-secondary"
            >
              -10%
            </button>
            <button 
              onClick={() => onUpdateProgress(project.id, project.progress + 10)}
              disabled={project.progress >= 100}
              className="btn btn-sm btn-primary"
            >
              +10%
            </button>
            <button 
              onClick={() => onUpdateProgress(project.id, 100)}
              className="btn btn-sm btn-success"
            >
              تکمیل پروژه
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;