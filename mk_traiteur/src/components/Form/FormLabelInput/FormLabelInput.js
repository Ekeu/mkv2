import React from 'react';

const FormLabelInput = ({
  children,
  placeholder,
  name,
  type,
  onChange,
  required,
  isChecked,
  change,
  inputType,
  value,
}) => {
  let input;
  if (inputType === 'checkbox') {
    input = (
      <div class='flex items-center'>
        <input
          id={name}
          name={name}
          type='checkbox'
          checked={isChecked}
          onChange={change}
          class='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded'
        />
        <label for='remember_me' class='ml-2 block text-sm text-gray-700'>
          {children}
        </label>
      </div>
    );
  } else {
    input = (
      <div>
        <label
          for='email'
          class='block text-sm font-hind font-medium text-gray-700'
        >
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
  }
  return <>{input}</>;
};

export default FormLabelInput;
