import React, { useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise : Promise<Stripe | null> = loadStripe('pk_test_51RKGgQCxKCZF6yvy4N2YLbulRZ5MASIyLlSquO0yhCWMz0nJdmhvunLPkjfCuI3I9ctLIwAURrl41BwOzdDTK4yT00IfZjM27b');


const StripePaiementPageClub = () => {
  const { clubId, membreId } = useParams();

  useEffect(() => {
    const handleCheckOut = async () => {
      const stripe = await stripePromise;
      if (!stripe || !clubId || !membreId) return;

      try {
        const response = await fetch(`http://localhost:5000/paiement/create-checkout-session/${clubId}/${membreId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const session = await response.json();
        if (session.id) {
          const result = await stripe.redirectToCheckout({ sessionId: session.id });
          if (result.error) alert(result.error.message);
        } else {
          console.error('Session non créée', session);
        }
      } catch (error) {
        console.error('Erreur lors du paiement :', error);
      }
    };

    handleCheckOut();
  }, [clubId, membreId]);

  return ( <div
    style={{
      display: 'flex',
      height: '70vh',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4F4F4',
      fontSize: '18px',
      fontWeight: 'bold',
    }}
  >
    Redirection vers le paiement sécurisé...
  </div>);
};
export default StripePaiementPageClub

 
