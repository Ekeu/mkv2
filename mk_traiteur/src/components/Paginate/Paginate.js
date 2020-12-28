import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <nav class='border-t border-gray-200 px-4 flex items-center justify-between sm:px-0'>
        <div class='-mt-px w-0 flex-1 flex'>
          <Link
            to={
              page > 1
                ? !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page - 1}`
                    : `/page/${page - 1}`
                  : `/admin/foods/${page - 1}`
                : !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/1`
                  : `/page/1`
                : `/admin/foods/1`
            }
            class='border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
          >
            <svg
              class='mr-3 h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                clip-rule='evenodd'
              />
            </svg>
            Previous
          </Link>
        </div>
        <div class='hidden md:-mt-px md:flex'>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/foods/${x + 1}`
              }
              class={`${
                x + 1 === page
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
            >
              {x + 1}
            </Link>
          ))}
        </div>
        <div class='-mt-px w-0 flex-1 flex justify-end'>
          <Link
            to={
              page >= pages
                ? !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${page}`
                    : `/page/${page}`
                  : `/admin/foods/${page}`
                : !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${page + 1}`
                  : `/page/${page + 1}`
                : `/admin/foods/${page + 1}`
            }
            class='border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'
          >
            Next
            <svg
              class='ml-3 h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fill-rule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clip-rule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </nav>
    )
  );
};

export default Paginate;
