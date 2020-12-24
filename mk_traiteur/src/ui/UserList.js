import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import md5 from 'md5';
import Message from '../components/Message/Message';
import { listUsers, deleteUser } from '../redux/reducers/user/user.actions';
import { USER_LIST_HEADERS } from '../constants/constants';

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/signin');
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (_id) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cet utilisateur?')) {
      dispatch(deleteUser(_id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message headline="Une érreure s'est produite" variant='danger'>
          {error}
        </Message>
      ) : (
        <div className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-8 lg:px-8'>
          <div class='max-w-3xl mx-auto text-center mb-8'>
            <h2 class='text-3xl font-extrabold text-gray-900'>Utilisateurs</h2>
          </div>
          <div class='flex flex-col'>
            <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div class='py-2 align-middle inline-block w-full sm:px-6 lg:px-8'>
                <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table class='w-full divide-y divide-gray-200'>
                    <thead class='bg-gray-50'>
                      <tr>
                        {USER_LIST_HEADERS.map((header, index) => (
                          <th
                            key={index}
                            scope='col'
                            class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            {header}
                          </th>
                        ))}
                        <th scope='col' class='relative px-6 py-3'>
                          <span class='sr-only'>Modifier</span>
                        </th>
                        <th scope='col' class='relative px-6 py-3'>
                          <span class='sr-only'>Supprimer</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class='bg-white divide-y divide-gray-200'>
                      {users.map((user) => (
                        <tr>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-900'>
                            {user._id}
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap'>
                            <div class='flex items-center'>
                              <div class='flex-shrink-0 h-10 w-10'>
                                <img
                                  class='h-10 w-10 rounded-full'
                                  src={`https://www.gravatar.com/avatar/${md5(
                                    user.email.toLowerCase().trim()
                                  )}?d=identicon`}
                                  alt={user.name}
                                />
                              </div>
                              <div class='ml-4'>
                                <div class='text-sm font-medium text-gray-900'>
                                  {user.name}
                                </div>
                                <div class='text-sm text-gray-500'>
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap'>
                            <span
                              class={`px-2 uppercase inline-flex text-xs leading-5 font-semibold ${
                                user.isAdmin
                                  ? 'rounded-full bg-green-100 text-green-800'
                                  : 'rounded-full bg-red-100 text-red-800'
                              }`}
                            >
                              {user.isAdmin ? 'oui' : 'non'}
                            </span>
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <Button
                              buttonType='link'
                              url={`/admin/user/${user._id}/edit`}
                              styles='bg-yellow-600 inline-flex hover:bg-yellow-700'
                            >
                              Modifier
                            </Button>
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <Button
                              onClick={() => deleteHandler(user._id)}
                              type='button'
                              styles='bg-red-600 inline-flex hover:bg-red-700'
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
