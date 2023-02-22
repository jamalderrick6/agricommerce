import Layout from "../../../layouts/Main";
import CheckoutStatus from "../../../components/checkout-status";
import MpesaForm from "../../../components/payment/Mpesa";
import VisaForm from "../../../components/payment/Visa";
import { useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentSection = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePayment = () => {
    setPaymentStatus("pending");
    if (paymentMethod === "visa") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createPaymentMethod({ type: "card", card });
    console.log("rsult", result);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      const postOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let payload = {
        amount: priceTotal * 100,
        id: result.paymentMethod.id,
      };
      postOptions.body = JSON.stringify(payload);
      const response = await fetch(
        "http://localhost:8000/payment",
        postOptions
      );
      const json = await response.json();

      if ([200, 201].includes(response.status)) {
        console.log("Successful Payment");
        setPaymentStatus("success");
      } else {
        console.log("json", json);
        setPaymentStatus("failed");
        setErrorMessage(json.message);
      }
    }
  };

  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }
    return totalPrice;
  });

  return (
    <>
      <Layout>
        <section className="cart">
          <div className="container">
            <div className="cart__intro">
              <h3 className="cart__title">Payment</h3>
              <CheckoutStatus step="payment" />
            </div>

            <div className="checkout-content">
              <div className="checkout__col-4">
                <div className="block">
                  <h3 className="block__title">Select Payment Method</h3>
                  <div className="payment__list">
                    <div
                      onClick={() => setPaymentMethod("mpesa")}
                      className={
                        "payment" +
                        (paymentMethod === "mpesa" ? " selected" : "")
                      }
                    >
                      <img
                        src="/images/logos/mpesa.png"
                        alt="Mpesa"
                        style={{ height: 28 }}
                      />
                      <span>Mpesa</span>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("visa")}
                      className={
                        "payment" +
                        (paymentMethod === "visa" ? " selected" : "")
                      }
                    >
                      <img src="/images/logos/visa.png" alt="Visa" />
                      <span>Visa</span>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("paypal")}
                      className={
                        "payment" +
                        (paymentMethod === "paypal" ? " selected" : "")
                      }
                    >
                      <img src="/images/logos/paypal.png" alt="Paypal" />
                      <span>PayPal</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout__col-8">
                {paymentMethod === "mpesa" ? (
                  <MpesaForm
                    phoneNumber={phoneNumber}
                    setPhoneNumber={(e) => setPhoneNumber(e.target.value)}
                    priceTotal={priceTotal + 300}
                  />
                ) : paymentMethod === "visa" ? (
                  <VisaForm
                    priceTotal={priceTotal + 300}
                    paymentStatus={paymentStatus}
                    errorMessage={errorMessage}
                  />
                ) : (
                  "Payment section"
                )}
              </div>
            </div>

            <div className="cart-actions cart-actions--checkout">
              <a href="/cart/checkout" className="cart__btn-back">
                <i className="icon-left"></i> Back
              </a>
              <div className="cart-actions__items-wrapper">
                <a
                  href="/products"
                  type="button"
                  className="btn btn--rounded btn--border"
                >
                  Continue shopping
                </a>
                <button
                  disabled={paymentMethod === "visa" && !stripe}
                  onClick={handlePayment}
                  type="button"
                  className="btn btn--rounded btn--yellow"
                >
                  Pay Kshs. {priceTotal + 300}
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default PaymentSection;
