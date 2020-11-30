import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ headline, children, svg, buttonText, link }) => {
  return (
    <div class='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
      <span
        class='hidden sm:inline-block sm:align-middle sm:h-screen'
        aria-hidden='true'
      >
        &#8203;
      </span>
      <div
        class='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
      >
        <div>
          <div class='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100'>
            {svg === 'good' && (
              <svg
                class='h-6 w-6 text-yellow-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            )}
            {svg === 'cart' && (
              <svg
                class='h-6 w-6 text-yellow-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            )}
            {svg === 'exclamation' && (
              <svg
                class='h-6 w-6 text-yellow-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            )}
          </div>
          <div class='mt-3 text-center sm:mt-5'>
            <h3
              class='text-lg leading-6 font-medium text-gray-900'
              id='modal-headline'
            >
              {headline}
            </h3>
            {children && (
              <div class='mt-2'>
                <p class='text-sm text-gray-500'>{children}</p>
              </div>
            )}
          </div>
        </div>
        <div class='mt-5 sm:mt-6'>
          <Link
            to={link}
            class='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-400 text-base font-hind tracking-widest uppercase font-medium text-white hover:bg-yellow-500 sm:text-sm '
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
