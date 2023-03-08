import { useAuthContext } from "context/AuthContext";
import { useDispatch } from "react-redux";
import { ProductStoreType } from "types";

const OrderedItem = ({ thumb, name, id, count, price }: ProductStoreType) => {
  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>
              {name} {`(${count})`}
            </h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td>Ksh{price}</td>
    </tr>
  );
};

export default OrderedItem;
