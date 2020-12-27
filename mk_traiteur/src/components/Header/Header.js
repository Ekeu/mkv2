import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';
import Logo from '../../assets/images/logo.png';
import Search from '../Search/Search';
import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';
import md5 from 'md5';
import { Link, Route } from 'react-router-dom';
import { logout } from '../../redux/reducers/user/user.actions';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className='bg-white z-20 shadow'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8'>
        <div className='relative h-16 flex justify-between'>
          <div className='relative z-10 px-2 flex lg:px-0'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/'>
                <img className='block h-8 w-auto' src={Logo} alt='Workflow' />
              </Link>
            </div>
          </div>
          <Route render={({ history }) => <Search history={history} />} />
          <div className='relative z-10 flex items-center lg:hidden'>
            <Button
              onClick={() => setIsMenu(!isMenu)}
              type='button'
              styles='rounded-md p-2 inline-flex items-center justify-center text-gray-400 bg-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none'
            >
              <span className='sr-only'>Open menu</span>
              <svg
                className={`${isMenu ? 'hidden' : 'block'} h-6 w-6`}
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
              <svg
                className={`${isMenu ? 'block' : 'hidden'} h-6 w-6`}
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
            </Button>
          </div>
          <div className='hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center'>
            <Link
              to='/cart'
              className='flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>Cart</span>
              <svg
                className='h-6 w-6'
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
            </Link>
            {userInfo ? (
              <div className='flex-shrink-0 relative ml-4'>
                <div>
                  <Button
                    buttonInline={{ padding: '0px 0px 0px 0px' }}
                    styles='bg-white rounded-full flex shadow-none'
                    id='user-menu'
                    onClick={() => setIsDropdown(!isDropdown)}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src={`https://www.gravatar.com/avatar/${md5(
                        userInfo.email.toLowerCase().trim()
                      )}?d=identicon`}
                      alt={userInfo.name}
                    />
                  </Button>
                </div>
                <Transition
                  show={isDropdown}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  {(ref) => (
                    <div
                      ref={ref}
                      className='origin-top-right absolute right-0 mt-2 font-hind w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu'
                    >
                      <div className='block py-2 px-4 text-sm' role='menuitem'>
                        <p class='text-sm'>Utilisateur:</p>
                        <p class='text-sm font-medium text-gray-900 truncate'>
                          {userInfo.name}
                        </p>
                      </div>

                      <Link
                        to='/profile'
                        className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                      >
                        Profil
                      </Link>

                      {userInfo && userInfo.isAdmin && (
                        <>
                          <Link
                            to='/admin/users'
                            className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                            role='menuitem'
                          >
                            Utilisateurs
                          </Link>
                          <Link
                            to='/admin/foods'
                            className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                            role='menuitem'
                          >
                            Nourritures
                          </Link>
                          <Link
                            to='/admin/orders'
                            className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'
                            role='menuitem'
                          >
                            Commandes
                          </Link>
                        </>
                      )}

                      <Button
                        type='button'
                        styles='w-full text-left'
                        buttonType='custom'
                        onClick={logoutHandler}
                      >
                        Déconnexion
                      </Button>
                    </div>
                  )}
                </Transition>
              </div>
            ) : (
              <div className='flex-shrink-0'>
                <Button
                  buttonType='link'
                  url='/signin'
                  styles='relative inline-flex items-center bg-yellow-600 hover:bg-yellow-700 ml-5'
                >
                  <span>Connexion</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav
        className={`${isMenu ? 'block lg:hidden' : 'hidden lg:hidden'}`}
        aria-label='Global'
      >
        {userInfo ? (
          <div className='border-t border-gray-200 pt-4 pb-3'>
            <div className='px-4 flex items-center'>
              <div className='flex-shrink-0'>
                <img
                  className='h-10 w-10 rounded-full'
                  src={`https://www.gravatar.com/avatar/${md5(
                    userInfo.email.toLowerCase().trim()
                  )}?d=identicon`}
                  alt={userInfo.name}
                />
              </div>
              <div className='ml-3'>
                <div className='text-base font-medium text-gray-800'>
                  {userInfo.name}
                </div>
                <div className='text-sm font-medium text-gray-500'>
                  {userInfo.email}
                </div>
              </div>
            </div>
            <div className='mt-3 px-2 space-y-1'>
              <CustomLink to='/profile'>Profil</CustomLink>

              <CustomLink to='/cart'>Pannier</CustomLink>

              {userInfo && userInfo.isAdmin && (
                <>
                  <CustomLink to='/admin/users'>Utilisateurs</CustomLink>
                  <CustomLink to='/admin/foods'>Nourritures</CustomLink>
                  <CustomLink to='/admin/orders'>Commandes</CustomLink>
                </>
              )}

              <button
                type='button'
                onClick={logoutHandler}
                className='block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 w-full text-left'
              >
                Déconnexion
              </button>
            </div>
          </div>
        ) : (
          <div className='border-t border-gray-200 pt-4 pb-3'>
            <div className='mt-3 px-2 space-y-1'>
              <Button
                buttonType='link'
                url='/signin'
                styles='block items-center bg-yellow-600 hover:bg-yellow-700 mx-auto'
              >
                <span>Connexion</span>
              </Button>
              <Button
                buttonType='link'
                url='/register'
                styles='block items-center bg-yellow-600 hover:bg-yellow-700 mx-auto'
              >
                <span>Inscription</span>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
