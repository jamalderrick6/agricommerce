import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import Item from "./item";
import { RootState } from "store";
import { useAuthContext } from "context/AuthContext";

const ShoppingCart = () => {
  const { cartItems } = useAuthContext();

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.map(
        (item) => (totalPrice += item.attributes.price * item.attributes.count)
      );
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems && cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Amount</th>
                  <th>Price</th>
                </tr>

                {cartItems.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    thumb={item.attributes.thumb}
                    name={item.attributes.name}
                    price={item.attributes.price}
                    count={item.attributes.count}
                  />
                ))}
              </tbody>
            </table>
          )}

          {cartItems && cartItems.length === 0 && <p>Nothing in the cart</p>}
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left"></i> Continue Shopping
          </a>
          <input
            type="text"
            placeholder="Promo Code"
            className="cart__promo-code"
          />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Total cost <strong>Ksh{priceTotal().toFixed(2)}</strong>
            </p>
            <a
              href={priceTotal() === 0 ? "#" : "/cart/checkout"}
              className="btn btn--rounded btn--yellow"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
