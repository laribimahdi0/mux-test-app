import React from 'react';
import classNames from 'classnames';

const Button = ({ children, onClick, type }) => {
  const buttonClass = classNames(
    'py-4 px-6 rounded-md transition-colors duration-300',
    {
      'bg-gray-900 text-white hover:bg-gray-700': type === 'primary',
      'bg-gray-300 text-black hover:bg-gray-400': type === 'secondary',
    }
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button