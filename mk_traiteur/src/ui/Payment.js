import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button/Button';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import { savePaymentMethod } from '../redux/reducers/cart/cart.actions';

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <div>
      <div class='max-w-7xl mx-auto p-24 text-center'>
        <CheckoutSteps step1 step2 />
        <div class='space-y-8 sm:space-y-6 mt-12'>
          <div class='text-left sm:mx-auto sm:max-w-xl lg:max-w-5xl'>
            <h3 class='text-lg font-medium font-hind tracking-tight'>
              Moyen de paiement
            </h3>
            <p class='text-sm font-hind text-gray-500'>
              Veuillez choisir votre moyen de paiement.
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div class='shadow overflow-hidden sm:rounded-md'>
              <div class='px-4 py-5 bg-white sm:p-6'>
                <fieldset>
                  <legend class='sr-only'>Payment methods</legend>
                  <ul class='relative bg-white rounded-md -space-y-px'>
                    <li>
                      <div class='bg-yellow-50 relative p-4 flex flex-col md:pl-4 md:pr-6 md:grid md:grid-cols-3'>
                        <label class='flex items-center text-sm cursor-pointer'>
                          <input
                            name='payment_method'
                            id='PayPal'
                            type='radio'
                            value='PayPal'
                            className='focus:ring-yellow-500 h-4 w-4 text-yellow-600 cursor-pointer'
                            aria-describedby='payment-option-method-0'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <span class='ml-3 font-hind font-medium text-gray-900'>
                            Paypal
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </fieldset>
              </div>
              <div class='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <Button
                  type='submit'
                  styles='bg-yellow-600 inline-flex hover:bg-yellow-700'
                >
                  Continuer
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
