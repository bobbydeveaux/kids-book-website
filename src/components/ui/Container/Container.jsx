import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

/**
 * Container component provides responsive layout constraints and centering.
 * Supports both constrained and full-width layouts via the fluid prop.
 */
const Container = ({
  children,
  fluid = false,
  className = '',
  ...props
}) => {
  const containerClass = fluid ? styles.containerFluid : styles.container;
  const combinedClassName = className
    ? `${containerClass} ${className}`
    : containerClass;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  /** Content to be contained */
  children: PropTypes.node.isRequired,
  /** When true, container takes full width without max-width constraints */
  fluid: PropTypes.bool,
  /** Additional CSS classes to apply */
  className: PropTypes.string,
};

Container.defaultProps = {
  fluid: false,
  className: '',
};

export default Container;