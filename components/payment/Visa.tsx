import React, { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const VisaForm = ({ paymentStatus, errorMessage }: any) => {
  return (
    <div className="visa__Payment">
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      {paymentStatus ? (
        <div className="statusBox">
          <div className="status__Logic">
            <div className={"container " + paymentStatus}>
              <img src="/images/logos/visa.png" alt="Visa" />
            </div>
            <span className="status__text">
              {paymentStatus === "success"
                ? "Payment Processed Successfully"
                : paymentStatus === "pending"
                ? "Your Payment is Processing"
                : errorMessage}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default VisaForm;
