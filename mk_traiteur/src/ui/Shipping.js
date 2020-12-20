import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormLabelInput from '../components/Form/FormLabelInput/FormLabelInput';
import Button from '../components/Button/Button';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps'
import { saveShippingAddress } from '../redux/reducers/cart/cart.actions';
const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <div>
      <div class='mt-10 sm:mt-0 p-24'>
        <CheckoutSteps step1/>
        <div class='md:grid md:grid-cols-3 md:gap-6 mt-10'>
          <div class='md:col-span-1'>
            <div class='px-4 sm:px-0'>
              <h3 class='text-lg font-hind font-medium leading-6 text-gray-900'>
                Votre commande est presque prête!
              </h3>
              <p class='mt-1 font-hind text-sm text-gray-600'>
                Veillez renseignez les informations de livraison.
              </p>
            </div>
          </div>
          <div class='mt-5 md:mt-0 md:col-span-2'>
            <form onSubmit={submitHandler}>
              <div class='shadow overflow-hidden sm:rounded-md'>
                <div class='px-4 py-5 bg-white sm:p-6'>
                  <div class='grid grid-cols-4 gap-4'>
                    <div class='col-span-4'>
                      <FormLabelInput
                        name='street_address'
                        placeholder='Saisissez votre adresse'
                        type='text'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      >
                        Adresse
                      </FormLabelInput>
                    </div>

                    <div class='col-span-4 sm:col-span-2 lg:col-span-2'>
                      <FormLabelInput
                        name='city'
                        placeholder='Saisissez votre ville'
                        type='text'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                      >
                        Ville
                      </FormLabelInput>
                    </div>

                    <div class='col-span-4 sm:col-span-2 lg:col-span-2'>
                      <FormLabelInput
                        name='postal_code'
                        placeholder='Saisissez votre code postal'
                        type='text'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                      >
                        Code Postal
                      </FormLabelInput>
                    </div>

                    <div class='col-span-4 sm:col-span-2 lg:col-span-2'>
                      <FormLabelInput
                        name='country'
                        placeholder='Saisissez votre pays'
                        type='text'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        Pays
                      </FormLabelInput>
                    </div>
                  </div>
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
    </div>
  );
};

export default Shipping;
