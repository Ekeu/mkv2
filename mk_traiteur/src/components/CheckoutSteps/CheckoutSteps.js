import React from 'react';
import Step from '../Step/Step';
import Arrow from '../Arrow/Arrow';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav aria-label='Progress'>
      <ol class='border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0'>
        {step1 ? (
          <Step complete={true} stepName='Connexion' stepUrl='/signin'>
            <Arrow />
          </Step>
        ) : (
          <Step complete={false} stepName='Connexion' stepPreview='01'>
            <Arrow />
          </Step>
        )}
        {step2 ? (
          <Step complete={true} stepName='Livraison' stepUrl='/shipping'>
            <Arrow />
          </Step>
        ) : (
          <Step complete={false} stepName='Livraison' stepPreview='02'>
            <Arrow />
          </Step>
        )}
        {step3 ? (
          <Step complete={true} stepName='Paiement' stepUrl='payment'>
            <Arrow />
          </Step>
        ) : (
          <Step complete={false} stepName='Paiement' stepPreview='03'>
            <Arrow />
          </Step>
        )}
        {step4 ? (
          <Step
            final={true}
            complete={true}
            stepName='Votre Commande'
            stepUrl='placeorder'
          ></Step>
        ) : (
          <Step
            complete={false}
            final={true}
            stepName='Votre Commande'
            stepPreview='04'
          ></Step>
        )}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
