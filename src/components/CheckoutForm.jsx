import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('[Error]', error);
            setErrorMessage(error.message); // Affiche le message d'erreur
            setSuccessMessage(''); // Réinitialise le message de succès
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setSuccessMessage('Payment successful!'); // Affiche le message de succès
            setErrorMessage(''); // Réinitialise le message d'erreur
            // Envoyer paymentMethod.id à votre serveur
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen"> {/* Centrer verticalement et horizontalement */}
          <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Paiement</h2>
            
            {/* Affichage des messages d'erreur et de succès */}
            {errorMessage && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
                {successMessage}
              </div>
            )}
    
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Card Details</label>
                <CardElement className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                disabled={!stripe}>
                Payer
              </button>
            </form>
          </div>
        </div>
      );
    };
    
    export default CheckoutForm;
    
