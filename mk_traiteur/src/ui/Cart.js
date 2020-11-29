import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message/Message';
import { addToCart } from '../redux/reducers/cart/cart.actions';
import { CART_HEADERS } from '../constants/constants';
import { currencyFormatter } from '../helper/currency';

const Cart = ({ match, location, history }) => {
  const parsed = queryString.parse(location.search);
  const foodId = match.params._id;
  const qty = Number(parsed.qty);
  const topping = parsed.topping;
  const ship = (parsed.ship ==='true');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartFoods } = cart;

  useEffect(() => {
    if (foodId) {
      dispatch(addToCart(foodId, qty, topping, ship));
    }
  }, [dispatch, foodId, qty, topping, ship]);

  const removeCartFromCartHandler = (id) => {
    console.log('remove');
  };
  return (
    <div class='flex flex-row justify-center h-screen'>
      <div class='-my-2 mx-auto overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div class='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 m-2'>
          <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table class='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  {CART_HEADERS.map((header, idx) => (
                    <th
                      scope='col'
                      key={idx}
                      class='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody class='bg-white divide-y divide-gray-200'>
                {cartFoods && cartFoods.map((food, index) => (
                  <tr>
                    <td class='px-6 py-4 whitespace-nowrap'>
                      <div class='flex items-center'>
                        <div class='flex-shrink-0 h-10 w-10'>
                          <img
                            class='h-10 w-10 rounded-md object-cover shadow-md'
                            src={require(`../assets${food.imageUrl}`).default}
                            alt=''
                          />
                        </div>
                        <div class='ml-4'>
                          <div class='text-sm font-hind tracking-tight font-medium text-gray-900'>
                            {food.name}
                          </div>
                          <div class='text-sm text-gray-500'>{`${food.name && food.name.toLowerCase()}@${
                            food.topping
                              ? food.topping.replace(/\s/g, '').toLowerCase()
                              : 'aucuncomplement'
                          }`}</div>
                        </div>
                      </div>
                    </td>
                    <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <span class='px-2 inline-flex text-xs font-poppins leading-5 font-semibold rounded bg-yellow-100 text-yellow-800'>
                        {currencyFormatter(food.price)}
                      </span>
                    </td>
                    <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country'
                        value={food.topping}
                        class='mt-1 block w-40 bg-white border border-gray-300 rounded shadow-sm py-2 px-2'
                        onChange={(e) =>
                          dispatch(addToCart(food._id, food.qty, e.target.value, food.ship))
                        }
                      >
                        {food.toppings && food.toppings.map((topping, index) => (
                          <option key={index} value={topping}>
                            {topping}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country'
                        value={food.qty}
                        class='mt-1 block w-24 bg-white border border-gray-300 rounded shadow-sm py-2 px-2'
                        onChange={(e) =>
                          dispatch(addToCart(food._id, Number(e.target.value), food.topping, food.ship))
                        }
                      >
                        {[...Array(10).keys()].map((idx) => (
                          <option key={idx + 1} value={idx + 1}>
                            {idx + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country'
                        value={food.ship}
                        class='mt-1 block w-24 bg-white border border-gray-300 rounded shadow-sm py-2 px-2'
                        onChange={(e) =>{
                          console.log('Target ',e.target.value)
                          console.log(food.ship)
                          dispatch(addToCart(food._id, food.qty, food.topping, e.target.value))
                        }
                        }
                      >
                       <option value="true">Oui</option>
                        <option value="false">Non</option>
                      </select>
                    </td>
                    <td class='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        class='h-6 w-6 text-mk_black'
                        onClick={() => removeCartFromCartHandler(food._id)}
                      >
                        <path
                          fillRule='evenodd'
                          d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class='bg-white overflow-hidden shadow rounded-lg w-72 m-2 h-40'>
        <div class='px-4 py-5 sm:p-6'>
          <div class='flex items-center'>
            <div class='flex-shrink-0 bg-mk_black rounded-md p-3'>
              <svg
                class='h-6 w-6 text-yellow-500'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                <path
                  fillRule='evenodd'
                  d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div class='ml-5 w-0 flex-1'>
              <dt class='text-sm font-medium text-gray-500 truncate'>
                Total Subscribers
              </dt>
              <dd class='flex items-baseline'>
                <div class='text-2xl font-semibold text-gray-900'>71,897</div>

                <div class='ml-2 flex items-baseline text-sm font-semibold text-green-600'>
                  <svg
                    class='self-center flex-shrink-0 h-5 w-5 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  <span class='sr-only'>Increased by</span>
                  122
                </div>
              </dd>
            </div>
          </div>
        </div>
        <div class='bg-gray-50 px-4 py-4 sm:px-6'>
          <div class='text-sm'>
            <button
              type='button'
              class='inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              PAYER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
