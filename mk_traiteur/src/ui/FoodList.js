import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import {
  listFoods,
  deleteFood,
  createFood,
} from '../redux/reducers/food/food.actions';
import { FOOD_LIST_HEADERS } from '../constants/constants';
import { currencyFormatter } from '../helper/currency';
import { FOOD_CREATE_RESET } from '../redux/reducers/food/food.types';
import { loadImage } from '../helper/loadImage';

const FoodList = ({ history, match }) => {
  const dispatch = useDispatch();

  const foodList = useSelector((state) => state.foodList);
  const { loading, error, foods } = foodList;

  const foodDelete = useSelector((state) => state.foodDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = foodDelete;
  const foodCreate = useSelector((state) => state.foodCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    food: createdFood,
  } = foodCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: FOOD_CREATE_RESET });
    if (userInfo && !userInfo.isAdmin) {
      history.push('/signin');
    }
    if (successCreate) {
      history.push(`/admin/food/${createdFood._id}/edit`);
    } else {
      dispatch(listFoods());
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, createdFood]);

  const deleteHandler = (_id) => {
    if (
      window.confirm('Êtes vous sûr de vouloir supprimer cette nourriture?')
    ) {
      dispatch(deleteFood(_id));
    }
  };

  const createFoodHandler = () => {
    dispatch(createFood());
  };

  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <Message headline="Une érreure s'est produite" variant='danger'>
          {errorDelete}
        </Message>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Message headline="Une érreure s'est produite" variant='danger'>
          {errorCreate}
        </Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message headline="Une érreure s'est produite" variant='danger'>
          {error}
        </Message>
      ) : (
        <div className='max-w-7xl mx-auto overflow-x-auto py-16 px-4 sm:px-6 lg:py-8 lg:px-8'>
          <div class='py-5'>
            <div class='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
              <div class='ml-4 mt-2'>
                <h3 class='text-lg leading-6 font-medium text-gray-900'>
                  Nourritures
                </h3>
              </div>
              <div class='ml-4 mt-2 flex-shrink-0'>
                <Button
                  type='button'
                  styles='bg-yellow-500 inline-flex hover:bg-yellow-600'
                  onClick={createFoodHandler}
                >
                  Nouvelle Chop
                </Button>
              </div>
            </div>
          </div>
          <div class='flex flex-col'>
            <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div class='py-2 align-middle inline-block w-full sm:px-6 lg:px-8'>
                <div class='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table class='w-full divide-y divide-gray-200'>
                    <thead class='bg-gray-50'>
                      <tr>
                        {FOOD_LIST_HEADERS.map((header, index) => (
                          <th
                            key={index}
                            scope='col'
                            class='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            {header}
                          </th>
                        ))}
                        <th scope='col' class='relative px-6 py-3'>
                          <span class='sr-only'>Modifier</span>
                        </th>
                        <th scope='col' class='relative px-6 py-3'>
                          <span class='sr-only'>Supprimer</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class='bg-white divide-y divide-gray-200'>
                      {foods.map((food) => (
                        <tr>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-900'>
                            {food._id}
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap'>
                            <div class='flex items-center'>
                              <div class='flex-shrink-0 h-10 w-10'>
                                <img
                                  class='h-10 w-10 rounded-md object-cover'
                                  src={loadImage(food.imageUrl)}
                                  alt={food.name}
                                />
                              </div>
                              <div class='ml-4'>
                                <div class='text-sm font-medium text-gray-900'>
                                  {food.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-900'>
                            {currencyFormatter(food.price)}
                          </td>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-900'>
                            {food.category}
                          </td>
                          <td class='px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-900'>
                            {food.brand}
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <Button
                              buttonType='link'
                              url={`/admin/food/${food._id}/edit`}
                              styles='bg-yellow-600 inline-flex hover:bg-yellow-700'
                            >
                              Modifier
                            </Button>
                          </td>
                          <td class='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <Button
                              onClick={() => deleteHandler(food._id)}
                              type='button'
                              styles='bg-red-600 inline-flex hover:bg-red-700'
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodList;
