import Layout from "../../layouts/Main";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { useState } from "react";
import { useAuthContext } from "context/AuthContext";
import UserAddresses from "components/user-profile/user-addresses";
import { useRouter } from "next/router";
import { message } from "antd";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, userAddresses } = useAuthContext();
  const [addressInView, setAddressInView] = useState(null);

  const viewAddress = (addId) => {
    console.log("addId", addId);
    if (addId) {
      let address = userAddresses.filter((address) => address.id === addId);
      console.log("address", address);
      setAddressInView(address);
    } else {
      setAddressInView(null);
    }
  };

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.map(
        (item) => (totalPrice += item.attributes.price * item.attributes.count)
      );
    }

    return totalPrice;
  };

  const triggerPayment = () => {
    if (addressInView) {
      router.push("/cart/payment");
    } else {
      message.warning("Please select an address");
    }
  };

  return (
    <>
      <Layout>
        <section className="cart">
          <div className="container">
            <div className="cart__intro">
              <h3 className="cart__title">Shipping and Payment</h3>
              <CheckoutStatus step="checkout" />
            </div>

            <div className="checkout-content">
              <div className="checkout__col-6">
                <div className="checkout__btns">
                  <button className="btn btn--rounded btn--yellow">
                    Log in
                  </button>
                  <button className="btn btn--rounded btn--border">
                    Sign up
                  </button>
                </div>

                <div className="block">
                  <UserAddresses
                    text="Select your Address"
                    viewAddress={viewAddress}
                    addressInView={addressInView}
                    addresses={userAddresses}
                  />
                </div>
              </div>

              <div className="checkout__col-4">
                <div className="block">
                  <h3 className="block__title">Delivery method</h3>
                  <ul className="round-options round-options--two">
                    <li className="round-item round-item--bg">
                      <p>Ksh300</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="checkout__col-2">
                <div className="block">
                  <h3 className="block__title">Your cart</h3>
                  <CheckoutItems />

                  <div className="checkout-total">
                    <p>Total cost</p>
                    <h3>Ksh{priceTotal() + 300}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-actions cart-actions--checkout">
              <a href="/cart" className="cart__btn-back">
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
                  onClick={triggerPayment}
                  type="button"
                  className="btn btn--rounded btn--yellow"
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CheckoutPage;
