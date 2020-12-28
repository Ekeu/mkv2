import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Food from '../components/Food/Food';
import FoodCarousel from '../components/FoodCarousel/FoodCarousel';
import Meta from '../components/Meta/Meta';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';
import Paginate from '../components/Paginate/Paginate';
import { listFoods } from '../redux/reducers/food/food.actions';
import { Link } from 'react-router-dom';

const Home = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods, page, pages } = foodList;

  useEffect(() => {
    dispatch(listFoods(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <FoodCarousel />
      ) : (
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
      )}
      <div class={`bg-gray-50`}>
        <div class='mx-auto pb-12 pt-6 px-4 max-w-7xl sm:px-6 lg:pb-24'>
          <div class='space-y-12'>
            <div class='space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none'>
              <h2 class='text-3xl font-hind font-bold tracking-tight sm:text-4xl text-mk_black'>
                Nos Délices
              </h2>
              <p class='text-xl text-mk_black font-hind'>
                Goutez aux saveurs de MK
              </p>
            </div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message headline="Une érreure s'est produite" variant='danger'>
                {error}
              </Message>
            ) : (
              <ul class='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>
                {foods.map((sauce) => (
                  <Food sauce={sauce} />
                ))}
              </ul>
            )}
          </div>
        </div>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </div>
    </>
  );
};

export default Home;
