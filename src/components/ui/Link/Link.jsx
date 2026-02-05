import React from 'react';
import styles from './Link.module.css';

const Link = ({
  children,
  href,
  className = '',
  variant = 'default',
  target,
  rel,
  ...props
}) => {
  const linkClass = `
    ${styles.link}
    ${styles[variant]}
    ${className}
  `.trim();

  // Add rel="noopener noreferrer" for external links if target="_blank"
  const linkRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

  return (
    <a
      href={href}
      className={linkClass}
      target={target}
      rel={linkRel}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;