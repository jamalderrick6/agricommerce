import { useAuthContext } from "context/AuthContext";
import { DeleteEntry, UpdateEntry } from "pages/api/cart";
import { useDispatch } from "react-redux";
import cart, { removeProduct, setCount } from "store/reducers/cart";
import { ProductStoreType } from "types";

const ShoppingCart = ({
  thumb,
  name,
  id,
  color,
  size,
  count,
  price,
}: ProductStoreType) => {
  const dispatch = useDispatch();
  const { cartItems, setUserCartItems } = useAuthContext();

  const removeFromCart = async () => {
    try {
      await DeleteEntry(id);
      let items = [...cartItems];
      let index = items.findIndex((x) => x.id === id);
      items.splice(index, 1);
      setUserCartItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  const setProductCount = async (count: number) => {
    if (count <= 0) {
      return;
    }
    const productToSave: ProductStoreType = {
      name: name,
      thumb: thumb,
      price: price,
      count: count,
    };
    try {
      const data = await UpdateEntry(id, productToSave);
      let items = [...cartItems];
      let index = items.findIndex((x) => x.id === id);
      items[index]["attributes"]["count"] = count;
      setUserCartItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-button">
          <button
            type="button"
            onClick={() => setProductCount(count - 1)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={() => setProductCount(count + 1)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>Ksh{price}</td>
      <td></td>
      <td></td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => removeFromCart()}></i>
      </td>
    </tr>
  );
};

export default ShoppingCart;
