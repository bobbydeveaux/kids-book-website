import PropTypes from 'prop-types';
import styles from './Grid.module.css';

function Grid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'medium',
  className = ''
}) {
  // Ensure column values are within the 1-4 range
  const safeColumns = {
    mobile: Math.min(Math.max(columns.mobile || 1, 1), 4),
    tablet: Math.min(Math.max(columns.tablet || 2, 1), 4),
    desktop: Math.min(Math.max(columns.desktop || 3, 1), 4),
  };

  const gridStyle = {
    '--grid-cols-mobile': safeColumns.mobile,
    '--grid-cols-tablet': safeColumns.tablet,
    '--grid-cols-desktop': safeColumns.desktop,
  };

  return (
    <div
      className={`${styles.grid} ${styles[`gap-${gap}`]} ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.shape({
    mobile: PropTypes.oneOf([1, 2, 3, 4]),
    tablet: PropTypes.oneOf([1, 2, 3, 4]),
    desktop: PropTypes.oneOf([1, 2, 3, 4]),
  }),
  gap: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Grid;