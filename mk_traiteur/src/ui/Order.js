import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { currencyFormatter } from '../helper/currency';
import {
  getOrderDetails,
  payOrder,
} from '../redux/reducers/order/order.actions';
import { ORDER_PAY_RESET } from '../redux/reducers/order/order.types';

const Order = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params._id;
  const [SDKReady, setSDKReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    order.foodsPrice = order.orderItems.reduce(
      (acc, food) => acc + food.price * food.qty,
      0
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        setSDKReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSDKReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message headline="Une érreure s'est produite" variant='danger'>
      {error}
    </Message>
  ) : (
    <main class='py-10 font-hind'>
      <div class='max-w-3xl mx-auto px-4 sm:px-6 md:items-center md:space-x-5 lg:max-w-full lg:px-8'>
        <h2 class='text-3xl tracking-wider uppercase leading-8 font-hind font-extrabold text-gray-900 sm:text-4xl'>
          Commande: <span className='text-yellow-600'>{order._id}</span>
        </h2>
      </div>
      <div class='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
        <div class='space-y-6 lg:col-start-1 lg:col-span-2'>
          <section aria-labelledby='shipping-address'>
            <div class='bg-white shadow sm:rounded-lg'>
              <div class='px-4 py-5 sm:px-6 font-hind'>
                <h2
                  id='applicant-information-title'
                  class='text-lg leading-6 font-medium text-gray-900'
                >
                  Adresse de Livraison
                </h2>
                <p class='mt-1 max-w-2xl text-sm text-gray-500'>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>

                <p class='mt-1'>
                  {order.isDelivered ? (
                    <Message
                      classes='w-full'
                      headline='Merci pour votre commande!'
                      variant='success'
                    >
                      Votre commande à été livré le {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message
                      classes='w-full'
                      headline='Statut commande'
                      variant='danger'
                    >
                      Commande non livrer
                    </Message>
                  )}
                </p>
              </div>
              <div class='border-t border-gray-200 px-4 py-5 sm:px-6'>
                <dl class='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                  <div class='sm:col-span-1'>
                    <dt class='text-sm font-medium text-gray-500'>
                      Nom(s) et Prénom(s)
                    </dt>
                    <dd class='mt-1 text-sm text-gray-900'>
                      {order.user.name}
                    </dd>
                  </div>
                  <div class='sm:col-span-1'>
                    <dt class='text-sm font-medium text-gray-500'>Email</dt>
                    <dd class='mt-1 text-sm text-gray-900'>
                      {order.user.email}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          <section aria-labelledby='payment-method'>
            <div class='bg-white shadow sm:rounded-lg'>
              <div class='px-4 py-5 sm:px-6 font-hind'>
                <h2
                  id='applicant-information-title'
                  class='text-lg leading-6 font-medium text-gray-900'
                >
                  Moyen de Paiement
                </h2>
                <p class='mt-1 max-w-2xl text-sm text-gray-500'>
                  {order.paymentMethod}
                </p>
                <p class='mt-1'>
                  {order.isPaid ? (
                    <Message
                      headline='Merci pour votre commande!'
                      variant='success'
                      classes='w-full'
                    >
                      Payé le {order.paidAt}
                    </Message>
                  ) : (
                    <Message
                      classes='w-full'
                      headline='Statut commande'
                      variant='danger'
                    >
                      Commande non payer
                    </Message>
                  )}
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby='cart-items'>
            <div class='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
              <div class='divide-y divide-gray-200'>
                <div class='px-4 py-5 sm:px-6'>
                  <h2
                    id='notes-title'
                    class='text-lg font-medium text-gray-900'
                  >
                    Votre Panier
                  </h2>
                </div>
                <div class='px-4 py-6 sm:px-6'>
                  {order.orderItems.length === 0 ? (
                    <Message headline='Hmmmm...' variant='danger'>
                      Votre commande est vide!
                    </Message>
                  ) : (
                    <ul class='space-y-8'>
                      {order.orderItems.map((food, index) => (
                        <li key={index}>
                          <div class='flex space-x-3'>
                            <div class='flex-shrink-0'>
                              <img
                                class='h-10 w-10 rounded-md object-cover'
                                src={
                                  food.imageUrl &&
                                  require(`../assets${food.imageUrl}`).default
                                }
                                alt=''
                              />
                            </div>
                            <div>
                              <div class='text-sm'>
                                <Link
                                  to={`/food/${food._id}`}
                                  class='font-medium text-gray-900'
                                >
                                  {food.name}
                                </Link>
                              </div>
                              <div class='mt-2 text-sm space-x-2'>
                                <span class='text-gray-500 font-medium'>
                                  {food.qty} x {currencyFormatter(food.price)} ={' '}
                                  {currencyFormatter(food.qty * food.price)}
                                </span>
                              </div>
                              <div class='mt-2 text-sm space-x-2'>
                                <span class='text-gray-500 font-medium'>
                                  Complément: {food.topping}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          aria-labelledby='order-summary'
          class='lg:col-start-3 lg:col-span-1'
        >
          <div class='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
            <h2 id='timeline-title' class='text-lg font-medium text-gray-900'>
              Resumé de votre commande
            </h2>

            <div class='mt-6 flow-root'>
              <ul class='-mb-8'>
                <li>
                  <div class='relative pb-8'>
                    <span
                      class='absolute top-4 left-4 -ml-px h-full w-0.5 bg-white'
                      aria-hidden='true'
                    ></span>
                    <div class='relative flex space-x-3'>
                      <div class='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                        <div>
                          <p class='text-sm font-medium text-gray-900'>
                            Nourritures
                          </p>
                        </div>
                        <div class='text-right text-sm whitespace-nowrap text-gray-500'>
                          {currencyFormatter(order.foodsPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div class='relative pb-8'>
                    <span
                      class='absolute top-4 left-4 -ml-px h-full w-0.5 bg-white'
                      aria-hidden='true'
                    ></span>
                    <div class='relative flex space-x-3'>
                      <div class='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                        <div>
                          <p class='text-sm font-medium text-gray-900'>
                            Livraison
                          </p>
                        </div>
                        <div class='text-right text-sm whitespace-nowrap text-gray-500'>
                          {currencyFormatter(order.shippingPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class='relative pb-8'>
                    <span
                      class='absolute top-4 left-4 -ml-px h-full w-0.5 bg-white'
                      aria-hidden='true'
                    ></span>
                    <div class='relative flex space-x-3'>
                      <div class='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                        <div>
                          <p class='text-sm font-medium text-gray-900'>Tax</p>
                        </div>
                        <div class='text-right text-sm whitespace-nowrap text-gray-500'>
                          {currencyFormatter(order.taxPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class='relative pb-8'>
                    <span
                      class='absolute top-4 left-4 -ml-px h-full w-0.5'
                      aria-hidden='true'
                    ></span>
                    <div class='relative flex space-x-3'>
                      <div class='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                        <div>
                          <p class='text-lg font-semibold text-gray-900'>
                            Total
                          </p>
                        </div>
                        <div class='text-right text-sm whitespace-nowrap text-gray-500'>
                          {currencyFormatter(order.totalPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {!order.isPaid && (
              <div class='mt-6 flex flex-col justify-stretch'>
                {loadingPay && <Loader />}
                {!SDKReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                    currency='EUR'
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Order;
