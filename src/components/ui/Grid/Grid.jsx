import PropTypes from 'prop-types';
import styles from './Grid.module.css';

function Grid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'medium',
  className = ''
}) {
  const gridStyle = {
    '--grid-cols-mobile': columns.mobile,
    '--grid-cols-tablet': columns.tablet,
    '--grid-cols-desktop': columns.desktop,
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
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
  gap: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Grid;