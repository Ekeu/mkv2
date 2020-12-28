import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import FormLabelInput from '../components/Form/FormLabelInput/FormLabelInput';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import {
  getUserDetails,
  updateUserProfile,
} from '../redux/reducers/user/user.actions';
import { listMyOrders } from '../redux/reducers/order/order.actions';
import { currencyFormatter } from '../helper/currency';
import { PROFILE_ORDERS_HEADERS } from '../constants/constants';
import { USER_UPDATE_PROFILE_RESET } from '../redux/reducers/user/user.types';

const Profile = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListUser = useSelector((state) => state.orderListUser);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListUser;

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin');
    } else {
      if (!user || !user.name || success) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mot de passes pas identiques');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <main class='max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8'>
      <div
        style={{ justifyItems: 'baseline' }}
        class='lg:grid lg:grid-cols-12 lg:gap-x-5'
      >
        <div
          class={`space-y-6 sm:px-6 lg:px-0 ${
            orders && orders.length === 0
              ? 'lg:col-start-5 lg:-ml-8'
              : 'lg:col-start-3'
          } lg:col-span-9`}
        >
          {message && (
            <Message
              variant='danger'
              headline="Une érreure s'est produite"
              classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
            >
              {message}
            </Message>
          )}
          {error && (
            <Message
              variant='danger'
              classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
              headline="Une érreure s'est produite"
            >
              {error}
            </Message>
          )}
          {success && (
            <Message
              variant='success'
              classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
              headline="Votre requête s'est éffectuée avec succès."
            >
              Profil mis à jour!
            </Message>
          )}
          {loading && <Loader />}
          <section aria-labelledby='payment_details_heading'>
            <form onSubmit={submitHandler}>
              <div class='shadow sm:rounded-md sm:overflow-hidden'>
                <div class='bg-white py-6 px-4 sm:p-6'>
                  <div>
                    <h2
                      id='payment_details_heading'
                      class='text-lg leading-6 font-medium text-gray-900'
                    >
                      Profile Utilisateur
                    </h2>
                    <p class='mt-1 text-sm text-gray-500'>
                      Mettez à jours vos informations personelles.
                    </p>
                  </div>

                  <div class='mt-6 grid grid-cols-4 gap-6'>
                    <div class='col-span-4 sm:col-span-2'>
                      <FormLabelInput
                        name='name'
                        placeholder='Moutapenda Didier'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      >
                        Nom et Prénom
                      </FormLabelInput>
                    </div>

                    <div class='col-span-4 sm:col-span-2'>
                      <FormLabelInput
                        name='email'
                        placeholder='Adresse e-mail'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      >
                        Adresse E-mail
                      </FormLabelInput>
                    </div>

                    <div class='col-span-4 sm:col-span-2'>
                      <FormLabelInput
                        name='password'
                        placeholder='Mot de passe'
                        type='password'
                        value={password}
                        required={false}
                        onChange={(e) => setPassword(e.target.value)}
                      >
                        Mot de passe
                      </FormLabelInput>
                    </div>

                    <div class='col-span-4 sm:col-span-2'>
                      <FormLabelInput
                        name='password'
                        placeholder='Confirmer mot de passe'
                        type='password'
                        required={false}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      >
                        Confirmer mot de passe
                      </FormLabelInput>
                    </div>
                  </div>
                </div>
                <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <Button
                    type='submit'
                    styles='bg-yellow-600 inline-flex hover:bg-yellow-700'
                  >
                    Enregistrer
                  </Button>
                </div>
              </div>
            </form>
          </section>
          <section aria-labelledby='billing_history_heading'>
            <div class='bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden'>
              <div class='px-4 sm:px-6'>
                <h2
                  id='billing_history_heading'
                  class='text-lg leading-6 font-medium text-gray-900'
                >
                  Historique de Commandes
                </h2>
              </div>
              <div class='mt-6 flex flex-col'>
                <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div class='py-2 align-middle inline-block w-full sm:px-6 lg:px-8'>
                    <div class='overflow-hidden border-t border-gray-200 w-full'>
                      <table class='w-full divide-y divide-gray-200'>
                        <thead class='bg-gray-50'>
                          <tr>
                            {PROFILE_ORDERS_HEADERS.map((header, index) => (
                              <th
                                key={index}
                                scope='col'
                                class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                              >
                                {header}
                              </th>
                            ))}
                            <th
                              scope='col'
                              class='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              <span class='sr-only'>Reçu</span>
                            </th>
                          </tr>
                        </thead>
                        {loadingOrders ? (
                          <Loader />
                        ) : errorOrders ? (
                          <Message
                            headline="Une érreure s'est produite"
                            variant='danger'
                          >
                            {error}
                          </Message>
                        ) : (
                          <tbody class='bg-white divide-y divide-gray-200'>
                            {orders.map((order) => (
                              <tr className='uppercase'>
                                <td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                  {order._id}
                                </td>
                                <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                  {order.createdAt.substring(0, 10)}
                                </td>
                                <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                  {currencyFormatter(order.totalPrice)}
                                </td>
                                <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                  {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                  ) : (
                                    <span class='px-2 inline-flex text-xs font-poppins leading-5 font-semibold rounded bg-red-100 text-red-800'>
                                      Non
                                    </span>
                                  )}
                                </td>
                                <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                  {order.shouldShip ? (
                                    order.isDelivered ? (
                                      order.deliveredAt.substring(0, 10)
                                    ) : (
                                      <span class='px-2 inline-flex text-xs uppercase font-poppins leading-5 font-semibold rounded bg-red-100 text-red-800'>
                                        Non
                                      </span>
                                    )
                                  ) : (
                                    <span class='px-2 inline-flex text-xs uppercase font-poppins leading-5 font-semibold'>
                                      -
                                    </span>
                                  )}
                                </td>
                                <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                  <Button
                                    buttonType='link'
                                    url={`/order/${order._id}`}
                                    styles='bg-yellow-600 inline-flex hover:bg-yellow-700'
                                  >
                                    Détails
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
