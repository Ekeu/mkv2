import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  listFoodDetails,
  createFoodReview,
} from '../redux/reducers/food/food.actions';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';
import Button from '../components/Button/Button';
import { currencyFormatter } from '../helper/currency';
import { loadImage } from '../helper/loadImage';
import md5 from 'md5';
import { FOOD_CREATE_REVIEW_RESET } from '../redux/reducers/food/food.types';
import { dateFormat } from '../helper/moment';
import Meta from '../components/Meta/Meta';

const Food = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ship, setShip] = useState('non');
  const [topping, setTopping] = useState('');

  const dispatch = useDispatch();

  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const foodCreateReview = useSelector((state) => state.foodCreateReview);
  const {
    success: successFoodReview,
    error: errorFoodReview,
  } = foodCreateReview;

  useEffect(() => {
    if(successFoodReview) {
      alert('Review submitted')
      setRating(0)
      setComment('')
      dispatch({type: FOOD_CREATE_REVIEW_RESET})
    }
    dispatch(listFoodDetails(match.params._id));
  }, [dispatch, match, successFoodReview]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params._id}?qty=${qty}&ship=${ship}&topping=${topping}`
    );
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createFoodReview(match.params._id, {
      rating,
      comment
    }))
  }

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
        <Message headline="Une érreure s'est produite" variant='danger'>
          {error}
        </Message>
      ) : (
        <>
          <Meta title={`MK Traiteur | ${food.name}`} />
          <div class='max-w-7xl my-0 mx-auto grid'>
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
                      src={food.imageUrl && loadImage(food.imageUrl)}
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
          <div class='mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-12'>
            <div class='space-y-6 lg:col-start-3 lg:col-span-8'>
              <section aria-labelledby='notes-title'>
                <div class='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
                  <div class='divide-y divide-gray-200'>
                    <div class='px-4 py-5 sm:px-6'>
                      <h2
                        id='notes-title'
                        class='text-lg font-medium text-gray-900'
                      >
                        Commentaires
                      </h2>
                      {errorFoodReview && (
                        <Message
                          variant='danger'
                          headline="Une érreure s'est produite"
                          classes='sm:w-full'
                        >
                          {errorFoodReview}
                        </Message>
                      )}
                    </div>
                    <div class='px-4 py-6 sm:px-6'>
                      {food.reviews.length === 0 && (
                        <Message variant='info' classes='sm:w-full'>
                          Aucun commentaire
                        </Message>
                      )}
                      <ul class='space-y-8'>
                        {food.reviews.map((review) => (
                          <li>
                            <div class='flex space-x-3'>
                              <div class='flex-shrink-0'>
                                <img
                                  class='h-10 w-10 rounded-full'
                                  src={`https://www.gravatar.com/avatar/${md5(
                                    review.email.toLowerCase().trim()
                                  )}?d=identicon`}
                                  alt=''
                                />
                              </div>
                              <div>
                                <div class='text-sm'>
                                  <span class='font-medium text-gray-900'>
                                    {review.name}
                                  </span>
                                </div>
                                <div class='mt-1 text-sm text-gray-700'>
                                  <p>{review.comment}</p>
                                </div>
                                <div class='mt-2 text-sm space-x-2'>
                                  <span class='text-gray-500 font-medium'>
                                    {dateFormat(review.createdAt)}
                                  </span>
                                  <Rating inline={{'margin-left': '0'}} value={review.rating} />
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div class='bg-gray-50 px-4 py-6 sm:px-6'>
                    {userInfo ? (
                      <div class='flex space-x-3'>
                        <div class='flex-shrink-0'>
                          <img
                            class='h-10 w-10 rounded-full'
                            src={`https://www.gravatar.com/avatar/${md5(
                              userInfo.email.toLowerCase().trim()
                            )}?d=identicon`}
                            alt={userInfo.name}
                          />
                        </div>
                        <div class='min-w-0 flex-1'>
                          <form onSubmit={submitHandler}>
                            <div>
                              <div>
                                <label
                                  for='location'
                                  class='block text-sm font-medium text-gray-700'
                                >
                                  Appréciation
                                </label>
                                <select
                                  id='rating'
                                  name='rating'
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                  class='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-yellow-500 sm:text-sm rounded-sm mb-2'
                                >
                                  <option value=''>Choisir...</option>
                                  <option value='1'>1 - Mauvais</option>
                                  <option value='2'>2 - Moyen</option>
                                  <option value='3'>3 - Bien</option>
                                  <option value='4'>4 - Très Bien</option>
                                  <option value='5'>5 - Excéllent</option>
                                </select>
                              </div>
                              <textarea
                                id='comment'
                                name='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows='3'
                                class='shadow-sm block w-full focus:ring-blue-500 focus:border-yellow-500 sm:text-sm border-gray-300 rounded-sm'
                                placeholder='Ajouter un commentaire'
                              ></textarea>
                            </div>
                            <div class='mt-3 flex items-center justify-between'>
                              <span class='group uppercase inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900'>
                                <span>MK TRAITEUR</span>
                              </span>
                              <Button
                                type='submit'
                                styles='inline-flex py-3 px-6 text-base bg-yellow-600 hover:bg-yellow-700'
                              >
                                Comment
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <Message variant='info' classes='sm:w-full'>
                        <Link to='/signin'>Connecte toi</Link> pour laisser un
                        commentaire
                      </Message>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Food;
