import React from 'react';

const Message = ({ children, variant, classes }) => {
  const styles = {};
  if (variant === 'danger') {
    styles.container = 'bg-red-50';
    styles.svg = 'text-red-400'
    styles.h3 = 'text-red-800'
    styles.p = 'text-red-700'
  }
  if (variant === 'success') {
    styles.container = 'bg-green-50';
    styles.svg = 'text-green-400'
    styles.h3 = 'text-green-800'
    styles.p = 'text-green-700'
  }


  return (
    <div class={['rounded-md p-4', styles.container, classes].join(' ')}>
      <div class='flex'>
        <div class='flex-shrink-0'>
          <svg
            class={['h-5 w-5', styles.svg].join(' ')}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fill-rule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clip-rule='evenodd'
            />
          </svg>
        </div>
        <div class='ml-3'>
          <h3 class={['text-sm font-medium font-hind', styles.h3].join(' ')}>
            Une erreure s'est produite!
          </h3>
          <div class={['mt-2 text-sm font-hind', styles.p].join(' ')}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
