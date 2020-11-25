import React from 'react';
import Logo from '../../assets/images/logo.png'

{
  /*     Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95" */
}
const Header = () => {
  return (
    <header>
      <div class='z-0 relative bg-white'>
        <div class='relative z-10 shadow'>
          <div class='max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10'>
            <div>
              <a href='/' class='flex'>
                <span class='sr-only'>MK Traiteur</span>
                <img
                  class='h-8 w-auto sm:h-10'
                  src={Logo}
                  alt='MK'
                />
              </a>
            </div>
            <div class='-mr-2 -my-2 md:hidden'>
              <button
                type='button'
                class='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              >
                <span class='sr-only'>Open menu</span>
                <svg
                  class='h-6 w-6'
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
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
            <div class='hidden md:flex-1 md:flex md:items-center md:justify-between ml-auto'>
              <div class='flex items-center md:ml-auto'>
                <a
                  href='/cart'
                  class='text-xs tracking-wider font-semibold leading-6 mt-1 font-hind uppercase flex text-mk_black'
                >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  class="h-6 w-6 mr-2 text-mk_black"
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                  Panier
                </a>
                <a
                  href='/signin'
                  class='ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded shadow text-xs tracking-wider font-semibold text-white uppercase bg-yellow-400 hover:bg-yellow-500'
                >
                  Connexion
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class='absolute z-20 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
          <div class='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div class='pt-5 pb-6 px-5 sm:pb-8'>
              <div class='flex items-center justify-between'>
                <div>
                  <img
                    class='h-8 w-auto'
                    src={Logo}
                    alt='MK'
                  />
                </div>
                <div class='-mr-2'>
                  <button
                    type='button'
                    class='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                  >
                    <span class='sr-only'>Close menu</span>
                    <svg
                      class='h-6 w-6'
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
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class='py-6 px-5'>
              <div class='mt-6'>
                <a
                  href='/signup'
                  class='w-full flex items-center justify-center px-4 py-3 border border-transparent rounded shadow text-xs tracking-wider font-semibold text-white uppercase bg-yellow-400 hover:bg-yellow-500'
                >
                  Inscription
                </a>
                <p class='mt-6 text-center text-base font-medium text-mk_black'>
                  Déjà client? {" "}
                  <a href='/sigin' class='text-yellow-500 hover:text-yellow-600'>
                    Connexion
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
