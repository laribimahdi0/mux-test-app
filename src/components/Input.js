import React from 'react';
import classNames from 'classnames';

const Input = ({ type, placeholder, value, onChange, ...props }) => {
  const commonClass = 'p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';

  if (type === 'textarea') {
    return (
      <textarea
        className={classNames(commonClass, 'resize-none')}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }

  return (
    <input
      className={commonClass}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input