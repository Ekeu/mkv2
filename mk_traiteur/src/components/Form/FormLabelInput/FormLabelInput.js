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
  actionName,
  fileOnchange,
  value,
}) => {
  const openDialog = () => {
    document.getElementById('image-file').click();
  };
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
  } else if (inputType === 'textarea') {
    input = (
      <div>
        <label for={name} class='block text-sm font-medium text-gray-700'>
          {children}
        </label>
        <div class='mt-1'>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows='3'
            class='block w-full shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md'
          ></textarea>
        </div>
      </div>
    );
  } else if (inputType === 'inputAddButton') {
    input = (
      <div class='space-y-1'>
        <label for={name} class='block text-sm font-medium text-gray-700'>
          {children}
        </label>
        <div class='flex'>
          <div class='flex-grow'>
            <input
              type={type}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              required={required}
              class='appearance-none block font-hind w-full px-3 py-2 border placeholder-gray-400 shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-md'
              placeholder={placeholder}
            />
          </div>
          <span class='ml-3'>
            <input id='image-file' type='file' onChange={fileOnchange} hidden />
            <button
              type='button'
              onClick={openDialog}
              class='bg-white font-hind inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            >
              <svg
                class='-ml-2 mr-1 h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clip-rule='evenodd'
                />
              </svg>
              <span className='font-hind leading-none'>{actionName}</span>
            </button>
          </span>
        </div>
      </div>
    );
  } else {
    input = (
      <div>
        <label
          for={name}
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
