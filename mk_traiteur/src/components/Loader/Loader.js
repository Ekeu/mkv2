import React from 'react';

const Loader = () => {
  return (
    <div class='animate-ping mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400 bg-opacity-50'>
      <div class='h-6 w-6 rounded-full bg-yellow-500 '></div>
    </div>
  );
};

export default Loader;
