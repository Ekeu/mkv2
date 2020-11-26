import React from 'react';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom'

const Food = ({
  sauce: {
    _id,
    name,
    imageUrl,
    availability,
    brand,
    price,
    rating,
    numReviews,
  },
}) => {
  return (
    <div class='space-y-4'>
      <div>
        <div class='pb-5/6 relative'>
          <Link to={`/food/${_id}`}>
            <img
              class='h-full w-full object-cover absolute rounded-lg shadow-md'
              src={require(`../../assets${imageUrl}`).default}
              alt={name}
            />
          </Link>
        </div>
        <div class='relative px-4 -mt-16'>
          <div class='bg-white p-6 rounded-lg shadow-lg'>
            <div class='flex items-baseline'>
              <span class='inline-block bg-yellow-200 text-yellow-600 text-xs uppercase tracking-widest font-semibold px-2 rounded-full'>
                {brand}
              </span>
              <div class='ml-2 text-gray-600 text-xs uppercase font-semibold tracking-widest font-hind'>
                {availability ? 'Disponible' : 'Indisponible'}
              </div>
            </div>
            <Link to={`/food/${_id}`}>
              <h4 class='mt-1 font-semibold text-mk_black text-lg leading-snug truncate'>
                {' '}
                {name}{' '}
              </h4>
            </Link>
            <div class='mt-1 text-poppins'>
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(price)}
            </div>
            <Rating value={rating} reviews={numReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
