import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Step = ({ complete, stepName, stepPreview, stepUrl, children, final }) => {
  let step;

  if (final && complete) {
    <Link to={stepUrl} class='group flex items-center'>
      <span class='px-6 py-4 flex items-center text-sm font-medium'>
        <span class='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400'>
          <svg
            class='w-6 h-6 text-white'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clip-rule='evenodd'
            />
          </svg>
        </span>
        <span class='ml-4 text-sm font-medium text-yellow-600'>
          {stepName}
        </span>
      </span>
    </Link>;
  } else if (final) {
    step = (
      <Link to={stepUrl} class='group flex items-center'>
        <span class='px-6 py-4 flex items-center text-sm font-medium'>
          <span class='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-yellow-600 rounded-full'>
            <span class='text-yellow-600'>
              {stepPreview}
            </span>
          </span>
          <span class='ml-4 text-sm font-medium text-yellow-600'>
            {stepName}
          </span>
        </span>
      </Link>
    );
  } else if (complete) {
    step = (
      <Link to={stepUrl} class='group flex items-center w-full'>
        <span class='px-6 py-4 flex items-center text-sm font-medium'>
          <span class='flex-shrink-0 w-10 h-10 flex items-center justify-center bg-yellow-600 rounded-full group-hover:bg-yellow-800'>
            <svg
              class='w-6 h-6 text-white'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clip-rule='evenodd'
              />
            </svg>
          </span>
          <span class='ml-4 text-sm font-medium text-yellow-600'>{stepName}</span>
        </span>
      </Link>
    );
  } else {
    step = (
      <span class='px-6 py-4 flex items-center text-sm font-medium'>
        <span
          class='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-yellow-600 rounded-full'
          aria-current='step'
        >
          <span class='text-yellow-600'>{stepPreview}</span>
        </span>
        <span class='ml-4 text-sm font-medium text-yellow-600'>{stepName}</span>
      </span>
    );
  }

  return (
    <li class='relative md:flex-1 md:flex'>
      {step}
      {children}
    </li>
  );
};

Step.propTypes = {
  complete: PropTypes.bool,
  final: PropTypes.bool,
  stepName: PropTypes.string,
  stepPreview: PropTypes.string,
  stepUrl: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Step;
