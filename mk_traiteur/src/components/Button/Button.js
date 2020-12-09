import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  type,
  styles,
  disabled,
  onClick,
  buttonType,
  url,
  buttonInline,
  linkInline,
}) => {
  let button;

  if (buttonType === 'link') {
    button = (
      <Link
        to={url}
        style={linkInline}
        class={[
          'flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white font-hind focus:outline-none uppercase tracking-widest',
          styles,
        ].join(' ')}
      >
        {children}
      </Link>
    );
  } else if (buttonType === 'custom') {
    button = (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={buttonInline}
        class={[
          'block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100',
          styles,
        ].join(' ')}
      >
        {children}
      </button>
    );
  } else {
    button = (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={buttonInline}
        class={[
          'flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white font-hind focus:outline-none uppercase tracking-widest',
          styles,
        ].join(' ')}
      >
        {children}
      </button>
    );
  }

  return button;
};

export default Button;
