import React from 'react';

const FormLabelInput = ({
  children,
  placeholder,
  name,
  type,
  onChange,
  required,
  value,
}) => {
  return (
    <div>
      <label for='email' class='block text-sm font-hind font-medium text-gray-700'>
        {children}
      </label>
      <div class='mt-1'>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          class='appearance-none font-hind block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
        />
      </div>
    </div>
  );
};

export default FormLabelInput;
