import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ children, url }) => {
  return (
    <Link
      to={url}
      className='block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    >
      {children}
    </Link>
  );
};

export default CustomLink;
