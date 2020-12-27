import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import { listOrders } from '../redux/reducers/order/order.actions';
import { ORDER_LIST_HEADERS } from '../constants/constants';
import { currencyFormatter } from '../helper/currency';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/signin');
    }
  }, [dispatch, userInfo, history]);

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
            <h2 class='text-3xl font-extrabold text-gray-900'>Commandes</h2>
          </div>
          <div class='flex flex-col'>
            <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div class='py-2 align-middle inline-block w-full sm:px-6 lg:px-8'>
                <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table class='w-full divide-y divide-gray-200'>
                    <thead class='bg-gray-50'>
                      <tr>
                        {ORDER_LIST_HEADERS.map((header, index) => (
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
                      {orders.map((order) => (
                        <tr>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm font-medium  text-gray-900'>
                            {order._id}
                          </td>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-500'>
                            {order.user && order.user.name}
                          </td>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-500'>
                            {order.createdAt.substring(0, 10)}
                          </td>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-500'>
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

export default OrderList;
