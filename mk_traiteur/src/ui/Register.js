import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import FormContainer from '../components/Form/FormContainer/FormContainer';
import FormLabelInput from '../components/Form/FormLabelInput/FormLabelInput';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import Logo from '../assets/images/logo.png';
import { register } from '../redux/reducers/user/user.actions';

const Register = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mot de passes pas identiques');
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <div class='sm:mx-auto sm:w-full sm:max-w-md'>
        <img class='mx-auto h-12 w-auto' src={Logo} alt='MK Traiteur' />
        <h2 class='mt-6 text-center text-3xl font-hind font-extrabold text-mk_black'>
          Inscription
        </h2>
        <p class='mt-2 text-center text-sm text-gray-600 max-w'>
          Déjà client?
          <Link
            to={redirect ? `/signin?redirect=${redirect}` : '/signin'}
            class='font-medium font-hind text-yellow-500 hover:text-yellow-600'
          >
            {' '}
            Connectez vous!
          </Link>
        </p>
      </div>
      {message && (
        <Message
          variant='danger'
          classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        >
          {message}
        </Message>
      )}
      {error && (
        <Message
          variant='danger'
          classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        >
          {error}
        </Message>
      )}
      {loading && <Loader />}
      <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div class='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form class='space-y-6' onSubmit={submitHandler}>
            <FormLabelInput
              name='name'
              placeholder='Moutapenda Didier'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              Nom et Prénom
            </FormLabelInput>
            <FormLabelInput
              name='email'
              placeholder='Adresse e-mail'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              Adresse E-mail
            </FormLabelInput>
            <FormLabelInput
              name='password'
              placeholder='Mot de passe'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Mot de passe
            </FormLabelInput>
            <FormLabelInput
              name='password'
              placeholder='Confirmer mot de passe'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
              Confirmer mot de passe
            </FormLabelInput>
            <div>
              <Button
                type='submit'
                styles='w-full bg-yellow-600 hover:bg-yellow-700'
              >
                Inscription
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
    </FormContainer>
  );
};

export default Register;
