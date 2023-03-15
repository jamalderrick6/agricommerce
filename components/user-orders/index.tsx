import OrderItem from "./item";
import { useAuthContext } from "context/AuthContext";
import { useEffect, useState } from "react";
import { getToken } from "utils/helpers";
import { API, BEARER } from "utils/constant";
import { message } from "antd";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = getToken();
  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`${API}/orders`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setOrders(data.data);
    } catch (error) {
      console.error(error);
      message.error("Error While Fetching User Orders");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  console.log("orders", orders);

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Your Orders</h3>
        </div>

        <div className="cart-list">
          {orders &&
            orders.length > 0 &&
            orders.map((order) => {
              return (
                <OrderItem
                  id={order.id}
                  orderStatus={order.attributes.status}
                  lastUpdatedAt={order.attributes.updatedAt}
                  orderItems={order.attributes.items}
                  orderTotal={order.attributes.price}
                />
              );
            })}

          {orders && orders.length === 0 && <p>You have no orders</p>}
        </div>
      </div>
    </section>
  );
};

export default UserOrders;
