import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import FormContainer from '../components/Form/FormContainer/FormContainer';
import FormLabelInput from '../components/Form/FormLabelInput/FormLabelInput';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import Logo from '../assets/images/logo.png';
import {
  listFoodDetails,
  updateFood,
} from '../redux/reducers/food/food.actions';
import { FOOD_UPDATE_RESET } from '../redux/reducers/food/food.types';
import axios from 'axios';

const FoodEdit = ({ match, history }) => {
  const foodId = match.params._id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState(false);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;
  const foodUpdate = useSelector((state) => state.foodUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = foodUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: FOOD_UPDATE_RESET });
      history.push('/admin/foods');
    } else {
      if (!food || !food.name || food._id !== foodId) {
        dispatch(listFoodDetails(foodId));
      } else {
        setName(food.name);
        setPrice(food.price);
        setImage(food.imageUrl);
        setBrand(food.brand);
        setCategory(food.category);
        setAvailability(food.availability);
        setDescription(food.description);
      }
    }
  }, [dispatch, history, food, foodId, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const {data} = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateFood({
        _id: foodId,
        name,
        price,
        image,
        brand,
        category,
        availability,
        description,
      })
    );
  };
  return (
    <>
      <div class='mt-2 mx-auto py-1 px-4 max-w-7xl sm:px-3 lg:py-2'>
        <div class='mt-3 sm:mt-0 sm:ml-4'>
          <Link
            to='/admin/foods'
            class='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-md text-xs font-semibold font-hind uppercase text-white tracking-widest bg-mk_black hover:bg-yellow-500 focus:outline-none'
          >
            Retour
          </Link>
        </div>
      </div>
      <FormContainer>
        <div class='sm:mx-auto sm:w-full sm:max-w-md'>
          <img class='mx-auto h-12 w-auto' src={Logo} alt='MK Traiteur' />
          <h2 class='mt-6 text-center text-3xl font-hind font-extrabold text-mk_black'>
            Modifier une nourriture
          </h2>
        </div>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message
            variant='danger'
            headline="Une érreure s'est produite"
            classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
          >
            {errorUpdate}
          </Message>
        )}
        {loading ? (
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
          <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div class='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <form class='space-y-6' onSubmit={submitHandler}>
                <FormLabelInput
                  name='name'
                  placeholder='Porc Sauté'
                  type='text'
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                >
                  Nom
                </FormLabelInput>
                <FormLabelInput
                  name='price'
                  placeholder='20'
                  type='number'
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                >
                  Prix
                </FormLabelInput>
                <>
                  <FormLabelInput
                    name='image'
                    placeholder="URL de l'image"
                    inputType='inputAddButton'
                    actionName='Charger'
                    type='text'
                    value={image}
                    required
                    fileOnchange={uploadFileHandler}
                    onChange={(e) => setImage(e.target.value)}
                  >
                    Image
                  </FormLabelInput>
                  {uploading && <Loader />}
                </>
                <FormLabelInput
                  name='brand'
                  placeholder='Cameroon'
                  type='text'
                  value={brand}
                  required
                  onChange={(e) => setBrand(e.target.value)}
                >
                  Origine
                </FormLabelInput>
                <FormLabelInput
                  name='category'
                  placeholder='Spécialité'
                  type='text'
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                >
                  Catégorie
                </FormLabelInput>
                <FormLabelInput
                  name='category'
                  inputType='textarea'
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                >
                  Description
                </FormLabelInput>
                <FormLabelInput
                  name='isAdmin'
                  inputType='checkbox'
                  isChecked={availability}
                  change={(e) => setAvailability(e.target.checked)}
                >
                  Disponible?
                </FormLabelInput>
                <div>
                  <Button
                    type='submit'
                    styles='w-full bg-yellow-600 hover:bg-yellow-700'
                  >
                    Modifier
                  </Button>
                </div>
              </form>
              <div class='mt-6'>
                <div class='relative'>
                  <div class='absolute inset-0 flex items-center'>
                    <div class='w-full border-t border-gray-300'></div>
                  </div>
                  <div class='relative flex justify-center text-sm'>
                    <span class='px-2 bg-white text-gray-500 font-hind text-xs uppercase tracking-wider'>
                      MK Traiteur
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </FormContainer>
    </>
  );
};

export default FoodEdit;
