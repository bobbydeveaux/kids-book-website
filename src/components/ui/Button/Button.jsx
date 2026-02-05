import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  as = 'button',
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;

  // Support rendering as button or anchor
  const Component = as === 'a' ? 'a' : 'button';

  const buttonProps = {
    className: classes,
    disabled: isDisabled,
    onClick: isDisabled ? undefined : onClick,
    ...props
  };

  // Only add button-specific props when rendering as button
  if (Component === 'button') {
    buttonProps.type = type;
  }

  return (
    <Component {...buttonProps}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={loading ? styles.content : undefined}>
        {children}
      </span>
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  as: PropTypes.oneOf(['button', 'a']),
};

export default Button;