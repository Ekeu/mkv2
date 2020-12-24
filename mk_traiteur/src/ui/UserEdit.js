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
  getUserDetails,
  updateUser,
} from '../redux/reducers/user/user.actions';
import { USER_UPDATE_RESET } from '../redux/reducers/user/user.types';

const UserEdit = ({ match, history }) => {
  const userId = match.params._id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, user, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <>
      <div class='mt-2 mx-auto py-1 px-4 max-w-7xl sm:px-3 lg:py-2'>
        <div class='mt-3 sm:mt-0 sm:ml-4'>
          <Link
            to='/admin/users'
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
            Modification d'Utilisateur
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
                  placeholder='Moutapenda Didier'
                  type='text'
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                >
                  Nom et Prénom
                </FormLabelInput>
                <FormLabelInput
                  name='email'
                  placeholder='Adresse e-mail'
                  type='email'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                >
                  Adresse E-mail
                </FormLabelInput>
                <FormLabelInput
                  name='isAdmin'
                  inputType='checkbox'
                  isChecked={isAdmin}
                  change={(e) => setIsAdmin(e.target.checked)}
                >
                  Admin?
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

export default UserEdit;
