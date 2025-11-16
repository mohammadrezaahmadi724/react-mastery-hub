import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  hover?: boolean;
  shadow?: boolean;
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  hover = false,
  shadow = true,
  border = true
}) => {
  return (
    <div className={`
      card 
      ${hover ? 'card-hover' : ''} 
      ${shadow ? 'card-shadow' : ''} 
      ${border ? 'card-border' : ''} 
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;