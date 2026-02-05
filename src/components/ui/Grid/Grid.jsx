import React from 'react';
import styles from './Grid.module.css';

const Grid = ({
  children,
  className = '',
  columns = 'auto',
  gap = 'medium',
  minItemWidth = '250px',
  ...props
}) => {
  const gridClass = `
    ${styles.grid}
    ${styles[`gap-${gap}`]}
    ${className}
  `.trim();

  const gridStyle = {
    gridTemplateColumns:
      columns === 'auto'
        ? `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
        : typeof columns === 'number'
        ? `repeat(${columns}, 1fr)`
        : columns,
  };

  return (
    <div className={gridClass} style={gridStyle} {...props}>
      {children}
    </div>
  );
};

export default Grid;