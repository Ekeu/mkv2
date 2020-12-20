import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Food from '../components/Food/Food';
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import { listFoods } from '../redux/reducers/food/food.actions';

const Home = () => {
  const dispatch = useDispatch();

  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;

  useEffect(() => {
    dispatch(listFoods());
  }, [dispatch]);

  return (
    <>
      <div class={`bg-gray-50`}>
        <div class='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:py-24'>
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
              <Loader/>
            ) : error ? (
              <Message headline="Une érreure s'est produite" variant='danger'>{error}</Message>
            ) : (
              <ul class='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>
                {foods.map((sauce) => (
                  <Food sauce={sauce} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
