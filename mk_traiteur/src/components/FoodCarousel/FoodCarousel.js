import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { listTopFoods } from '../../redux/reducers/food/food.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadImage } from '../../helper/loadImage';
import { currencyFormatter } from '../../helper/currency';

const FoodCarousel = () => {
  const dispatch = useDispatch();

  const foodTopRated = useSelector((state) => state.foodTopRated);
  const { loading, error, foods } = foodTopRated;

  useEffect(() => {
    dispatch(listTopFoods());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message
      variant='danger'
      headline="Une érreure s'est produite"
      classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
    >
      {error}
    </Message>
  ) : (
    <div class='max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8'>
      <Carousel autoPlay infiniteLoop showStatus={false}>
        {foods.map((food) => (
          <div key={food._id}>
            <Link to={`/food/${food._id}`}>
              <img
                alt={food.name}
                src={loadImage(food.imageUrl)}
                className='h-96 w-full object-cover'
              />
              <div class='legend'>
                <div class='px-4 lg:w-1/2 sm:px-8 xl:pr-16'>
                  <h1 class='text-4xl tracking-tight font-extrabold text-mk_black sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
                    <span class='block xl:inline'>{food.name}</span> <br/>
                    <span class='block text-white xl:inline'>
                      {currencyFormatter(food.price)}
                    </span>
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FoodCarousel;
