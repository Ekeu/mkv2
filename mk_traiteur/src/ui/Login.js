import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import FormContainer from '../components/Form/FormContainer/FormContainer';
import FormLabelInput from '../components/Form/FormLabelInput/FormLabelInput';
import Button from '../components/Button/Button';
import Message from '../components/Message/Message';
import Logo from '../assets/images/logo.png';
import { login } from '../redux/reducers/user/user.actions';

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <div class='sm:mx-auto sm:w-full sm:max-w-md'>
        <img class='mx-auto h-12 w-auto' src={Logo} alt='MK Traiteur' />
        <h2 class='mt-6 text-center text-3xl font-hind font-extrabold text-mk_black'>
          Connexion
        </h2>
        <p class='mt-2 text-center text-sm text-gray-600 max-w'>
          Ou
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            class='font-medium font-hind text-yellow-500 hover:text-yellow-600'
          >
            {' '}
            Créez un nouveau compte
          </Link>
        </p>
      </div>
      {error && <Message variant='danger' classes='mt-8 sm:mx-auto sm:w-full sm:max-w-md' headline="Une érreure s'est produite">{error}</Message>}
      {loading && <Loader />}
      <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div class='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form class='space-y-6' onSubmit={submitHandler}>
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
              name='password'
              placeholder='Mot de passe'
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            >
              Mot de passe
            </FormLabelInput>
            <div>
              <Button type='submit' styles='w-full bg-yellow-600 hover:bg-yellow-700'>
                Connexion
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

export default Login;
