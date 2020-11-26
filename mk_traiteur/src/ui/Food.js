import React from 'react';
import Rating from '../components/Rating/Rating';
import { Link } from 'react-router-dom';
import foods from '../constants/food.data';

const Food = ({ match }) => {
  const food = foods.find((food) => food._id === match.params._id);
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
                  src={require(`../assets${food.imageUrl}`).default}
                  alt={food.name}
                />
              </div>
            </figure>
          </section>
          <section class=' mb-8 px-4 float-left w-full md:clear-right md:float-right md:mt-6 md:w-3/6 md:max-w-sm md:my-0 md:mr-16 md:ml-0 xl:p-0 xl:ml-0 xl:max-w-none xl:mr-0 xl:border-0'>
            <div class='m-0 p-0'>
              <p class='my-3 mx-0 md:text-xl font-hind text-lg font-normal leading-relaxed tracking-normal text-sols m-0 max-h-40 overflow-hidden md:w-96'>
                {food.description}
              </p>
            </div>
            <div></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Food;
