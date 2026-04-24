'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

type ButtonProps = {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const base = 'inline-flex items-center justify-center font-inter font-medium transition-all duration-300 tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-champagne text-obsidian hover:bg-champagne-light',
  outline: 'border border-champagne text-champagne hover:bg-champagne hover:text-obsidian',
  ghost: 'text-champagne hover:text-champagne-light',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-sm',
  md: 'px-6 py-3 text-sm rounded-sm',
  lg: 'px-8 py-4 text-base rounded-sm',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, external, children, className = '', onClick, disabled, type = 'button' }, ref) => {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {children}
          </a>
        );
      }
      return <Link href={href} className={cls}>{children}</Link>;
    }

    return (
      <button ref={ref} type={type} onClick={onClick} disabled={disabled} className={cls}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
