import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listFoodDetails } from '../redux/reducers/food/food.actions';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';
import Button from '../components/Button/Button';
import { currencyFormatter } from '../helper/currency';

const Food = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [ship, setShip] = useState('non');
  const [topping, setTopping] = useState('');

  const dispatch = useDispatch();
  const foodDetails = useSelector((state) => state.foodDetails);

  const { loading, error, food } = foodDetails;
  useEffect(() => {
    dispatch(listFoodDetails(match.params._id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params._id}?qty=${qty}&ship=${ship}&topping=${topping}`
    );
  };

  return (
    <>
      <div class='mt-2 mx-auto py-1 px-4 max-w-7xl sm:px-3 lg:py-6'>
        <div class='mt-3 sm:mt-0 sm:ml-4'>
          <Link
            to='/'
            class='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-md text-xs font-semibold font-hind uppercase text-white tracking-widest bg-mk_black hover:bg-yellow-500 focus:outline-none'
          >
            Retour
          </Link>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div class='max-w-7xl my-0 mx-auto'>
          <div class='lg:mx-auto lg:max-w-full lg:py-0 lg:px-16 lg:relative lg:w-full'>
            <div class='float-left w-full px-3 md:border-r-8 md:border-solid md:border-gray-100 md:w-3/6 md:pr-12 md:mt-6 md:clear-right md:float-right border-0 md:p-0 md:b-0 md:my-0 md:mr-16 md:ml-0 md:max-w-sm xl:border-0 xl:mr-0 xl:max-w-none xl:ml-0 xl:p-0'>
              <div class='m-0 p-0'>
                <h1 class='text-base mx-0 mt-1 mb-3 lg:text-3xl font-hind font-semibold leading-tight tracking-tighter text-mk_black w-auto'>
                  {food.name}
                </h1>
                <Rating value={food.rating} reviews={food.numReviews} />
              </div>
            </div>
            <section class='px-4 w-full float-left md:pl-0 md:pr-0 mb-0 md:max-w-md md:h-96 md:mt-0 md:mr-0'>
              <figure class='relative m-auto justify-center flex items-center md:min-h-366 md:min-w-inherit xl:m-auto'>
                <div class='w-full max-w-sm relative m-auto bg-white rounded-lg shadow-sm md:max-w-md md:max-h-96 pb-96'>
                  <img
                    class='w-full h-full m-auto left-0 right-0 top-0 bottom-0 absolute object-cover rounded-lg'
                    src={
                      food.imageUrl &&
                      require(`../assets${food.imageUrl}`).default
                    }
                    alt={food.name}
                  />
                </div>
              </figure>
            </section>
            <section class=' mb-8 px-4 float-left w-full md:clear-right md:float-right md:mt-6 md:w-3/6 md:max-w-sm md:my-0 md:mr-16 md:ml-0 xl:p-0 xl:ml-0 xl:max-w-none xl:mr-0 xl:border-0'>
              <div class='m-0 p-0'>
                <p class='my-3 mx-0 md:text-xl font-hind text-lg font-normal leading-relaxed tracking-normal text-sols m-0 max-h-44 overflow-hidden md:w-96'>
                  {food.description}
                </p>
              </div>
              <div class='mb-6 text-center sm:text-left'>
                <div class='mx-0 mt-3 mb-4 text-left'>
                  <div class='inline-block font-poppins font-semibold text-base leading-snug tracking-tighter text-mk_black md:text-3xl md:mb-0'>
                    <div class='m-0 p-0'>
                      <span>{currencyFormatter(food.price)}</span>
                    </div>
                  </div>
                  <div class='max-w-none mx-0 mt-0 mb-8 md:w-1/3 md:inline-block md:rounded-none float-none m-0 inline-block text-left ml-8'>
                    <label class='text-black cursor-pointer text-base font-hind mt-5 mx-0 mb-3 leading-relaxed font-medium hidden'>
                      Quantity
                    </label>
                    <div class='h-8 w-24 inline-flex m-0'>
                      <button
                        type='button'
                        class='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium text-white bg-yellow-500 mr-2'
                        onClick={() => setQty(qty - 1)}
                        disabled={qty === 1}
                      >
                        <svg
                          class='h-4 w-4 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M18 12H6'
                          />
                        </svg>
                      </button>
                      <input
                        class='m-0 align-middle inline-block md:text-center border-gray-600 border-solid border tracking-tighter leading-relaxed font-medium text-lg font-poppins p-0 w-12 relative'
                        id='qty'
                        name='qty'
                        type='tel'
                        value={qty}
                        min='1'
                        pattern={`[0-9]*`}
                      />
                      <button
                        type='button'
                        class='inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium text-white bg-yellow-500 ml-2'
                        onClick={() => setQty(qty + 1)}
                      >
                        <svg
                          class='h-4 w-4 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class='grid grid-cols-6'>
                  <div class='col-span-6 sm:col-span-3'>
                    <label
                      for='complement'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Complément
                    </label>
                    <select
                      id='complement'
                      name='complement'
                      autocomplete='complement'
                      class='mt-1 block w-48 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-2'
                      onChange={(e) => setTopping(e.target.value)}
                    >
                      <option value='default'>Complément</option>
                      {food.toppings &&
                        food.toppings.map((topping, idx) => (
                          <option key={idx} value={topping}>
                            {topping}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class='col-span-6 sm:col-span-3'>
                    <label
                      for='country'
                      class='block text-sm font-medium text-gray-700'
                    >
                      Faites vous livrer? (5€)
                    </label>
                    <select
                      id='country'
                      name='country'
                      autocomplete='country'
                      class='mt-1 block w-48 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-2'
                      onChange={(e) => setShip(e.target.value)}
                    >
                      <option value='non'>Non</option>
                      <option value='oui'>Oui</option>
                    </select>
                  </div>
                </div>
                <Button
                  disabled={!food.availability}
                  onClick={addToCartHandler}
                  type='button'
                  styles='inline-flex w-48 mt-10 py-3 px-6 text-base bg-yellow-600 hover:bg-yellow-700'
                >
                  Ajouter
                </Button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Food;
