import React from 'react';
import Food from '../components/Food/Food';
import { FOOD_SAUCE } from '../constants/food.data';

const Home = () => {
  return (
    <>
      <div class='bg-gray-100'>
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
            <ul class='space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>
              {FOOD_SAUCE.map((sauce) => (
                <Food sauce={sauce} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
