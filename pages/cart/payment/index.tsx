import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import PaymentSection from "./payment";

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const publishableKey = "pk_test_mHyQMeKwy2RKxRHq2eWC78Xi00pFojwgeW";
    const retrievePublishableKey = async () => {
      const stripe = loadStripe(publishableKey);
      setStripePromise(stripe);
    };
    retrievePublishableKey();
  }, []);

  return (
    <>
      {stripePromise ? (
        <Elements stripe={stripePromise}>
          <PaymentSection />
        </Elements>
      ) : null}
    </>
  );
};

export default PaymentPage;
