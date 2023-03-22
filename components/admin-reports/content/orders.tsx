import { useEffect, useState } from "react";
import { getToken } from "utils/helpers";
import { API, BEARER } from "utils/constant";
import { message } from "antd";
import csvDownload from "json-to-csv-export";

const OrderReports = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [viewedOrders, setViewedOrders] = useState("all");
  const token = getToken();
  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`${API}/orders`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setOrders(data.data);
      setFilteredOrders(data.data);
    } catch (error) {
      console.error(error);
      message.error("Error While Fetching User Orders");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const filterOrders = (e) => {
    const { value } = e.target;
    setViewedOrders(value);
    if (value === "pending") {
      setFilteredOrders(
        orders.filter((ord) => ord.attributes.status === "Pending Pickup")
      );
    } else if (value === "transit") {
      setFilteredOrders(
        orders.filter((ord) => ord.attributes.status === "In transit")
      );
    } else if (value === "done") {
      setFilteredOrders(
        orders.filter((ord) => ord.attributes.status === "Fulfilled")
      );
    } else {
      setFilteredOrders(orders);
    }
  };

  const downloadOrders = () => {
    console.log("orders", filteredOrders);
    const json = filteredOrders.map((ord) => ({
      orderID: ord.id,
      creationDate: ord.attributes.createdAt,
      orderItems: ord.attributes.items.length,
      orderPrice: ord.attributes.price,
      orderStatus: ord.attributes.status,
    }));
    console.log(json);
    const dataToConvert = {
      data: json,
      filename: `${viewedOrders}_orders`,
      delimiter: ",",
      headers: ["ID", "Created At", "Items", "Order Price", "Order Status"],
    };
    csvDownload(dataToConvert);
  };

  return (
    <section className="content order">
      <div className="filter__select">
        <h4>Sort by: </h4>
        <div className="select-wrapper">
          <select onChange={filterOrders}>
            <option>All</option>
            <option value="pending">Pending Pickup</option>
            <option value="transit">In transit</option>
            <option value="done">Fulfilled</option>
          </select>
        </div>
      </div>
      <div className="actions">
        <div className="card">
          <span>Number of Orders</span>
          <span>{filteredOrders && filteredOrders.length}</span>
        </div>
        <a
          href="http://localhost:1337/admin/content-manager/collectionType/api::order.order?page=1&pageSize=10&sort=id:ASC"
          className="view--button"
          target="_blank"
        >
          View Orders
        </a>
        <button onClick={downloadOrders} className="download--button">
          Download orders
        </button>
      </div>
    </section>
  );
};

export default OrderReports;
