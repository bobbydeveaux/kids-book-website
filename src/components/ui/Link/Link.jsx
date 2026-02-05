import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Link.module.css';

/**
 * Link component that handles both internal and external navigation
 * Internal links use React Router, external links open in new tabs with security attributes
 */
const Link = ({
  href,
  to,
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  // Use 'to' prop for React Router links, 'href' for external links
  const linkTarget = to || href;

  // Determine if this is an external link
  const isExternal = href && (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );

  // Combine CSS classes
  const linkClasses = [
    styles.link,
    styles[`link--${variant}`],
    className
  ].filter(Boolean).join(' ');

  // External link - render as anchor tag with security attributes
  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link - use React Router Link
  return (
    <RouterLink
      to={linkTarget}
      className={linkClasses}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  /** URL for external links */
  href: PropTypes.string,
  /** Route path for internal navigation */
  to: PropTypes.string,
  /** Link content */
  children: PropTypes.node.isRequired,
  /** Visual variant of the link */
  variant: PropTypes.oneOf(['default', 'button', 'nav']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Link;