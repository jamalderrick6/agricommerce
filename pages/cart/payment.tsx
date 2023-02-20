import Layout from "../../layouts/Main";
import CheckoutStatus from "../../components/checkout-status";
import { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("visa");
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

              <div className="checkout__col-8">payment section</div>
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
                  onClick={() => setShowModal(true)}
                  type="button"
                  className="btn btn--rounded btn--yellow"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default PaymentPage;
