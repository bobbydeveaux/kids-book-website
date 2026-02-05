import React from 'react';

interface GridProps {
  children: React.ReactNode;
  gap?: string;
  className?: string;
}

const Grid: React.FC<GridProps> = ({
  children,
  gap = '1rem',
  className = '',
}) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
    gap,
  };

  return (
    <div style={gridStyle} className={className}>
      {children}
    </div>
  );
};

export default Grid;
