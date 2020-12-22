import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import Message from '../components/Message/Message';
import { currencyFormatter } from '../helper/currency';
import { createOrder } from '../redux/reducers/order/order.actions';

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  cart.foodsPrice = cart.cartFoods.reduce(
    (acc, food) => acc + food.price * food.qty,
    0
  );
  cart.shippingPrice = cart.cartFoods.find((food) => food.ship === 'oui')
    ? 5
    : 0;
  cart.taxPrice = Number((0.3 * cart.foodsPrice).toFixed(2));
  cart.totalPrice =
    Number(cart.foodsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const PlaceOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartFoods,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        foodsPrice: cart.foodsPrice,
        shippingPrice: cart.shippingPrice,
        shouldShip: cart.shippingPrice === 5 ? true : false,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <main class='py-10 font-hind'>
      <div class='max-w-3xl mx-auto px-4 sm:px-6 md:items-center md:space-x-5 lg:max-w-full lg:px-8'>
        <CheckoutSteps step1 step2 step3 />
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
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
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
                  {cart.paymentMethod}
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
                  {cart.cartFoods.length === 0 ? (
                    <Message headline='Hmmmm...' variant='danger'>
                      Votre panier est vide!
                    </Message>
                  ) : (
                    <ul class='space-y-8'>
                      {cart.cartFoods.map((food, index) => (
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
                          {currencyFormatter(cart.foodsPrice)}
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
                          {currencyFormatter(cart.shippingPrice)}
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
                          {currencyFormatter(cart.taxPrice)}
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
                          {currencyFormatter(cart.totalPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {error && (
              <div class='mt-6 flex flex-col justify-stretch'>
                <Message headline="Une érreure s'est produite" variant='danger'>
                  {error}
                </Message>
              </div>
            )}
            <div class='mt-6 flex flex-col justify-stretch'>
              <Button
                type='submit'
                styles='bg-yellow-600 inline-flex hover:bg-yellow-700'
                disabled={cart.cartFoods.length === 0}
                onClick={PlaceOrderHandler}
              >
                Placez votre Commande
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PlaceOrder;
