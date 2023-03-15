import Receipt from "components/Receipt";
import { useState } from "react";
import { ChevronDown } from "react-feather";
import OrderedItem from "./orderedItem";

const OrderItem = ({
  id,
  lastUpdatedAt,
  orderStatus,
  orderTotal,
  orderItems,
}) => {
  const [accordionActive, setAccordionActive] = useState(false);
  const [viewReceipt, setViewReceipt] = useState(false);
  return (
    <>
      <div className="order--accordion">
        <div
          onClick={() => setAccordionActive(!accordionActive)}
          className="order--header"
        >
          <span className="order-id">Order {id}</span>
          <button
            className="btn btn--rounded btn--yellow"
            onClick={() => setViewReceipt(true)}
          >
            View Receipt
          </button>
          <div className="order--status">
            <span
              className={
                orderStatus === "Pending Pickup"
                  ? "pending"
                  : orderStatus === "In transit"
                  ? "transit"
                  : "fulfilled"
              }
            >
              {orderStatus}
            </span>
            <ChevronDown className={accordionActive && " --show"} />
          </div>
        </div>
        <div
          className="accordion--body"
          style={{ display: !accordionActive && "none" }}
        >
          <div className="order--items">
            {orderItems && orderItems.length > 0 && (
              <table>
                <tbody>
                  <span>Items Ordered</span>
                  {orderItems.map((item) => (
                    <OrderedItem
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
          </div>
          <div className="order--summary">
            <span
              className={
                "status-desc " +
                (orderStatus === "Pending Pickup"
                  ? "pending"
                  : orderStatus === "In transit"
                  ? "transit"
                  : "fulfilled")
              }
            >
              {orderStatus === "Pending Pickup"
                ? "Your order is  currently awaiting pickup"
                : orderStatus === "In transit"
                ? "Your Order is on the way!"
                : "Order fulfilled"}
            </span>
            <span className="total">Kshs.{orderTotal}</span>
          </div>
        </div>
      </div>
      {viewReceipt && (
        <Receipt
          lastUpdatedAt={lastUpdatedAt}
          orderStatus={orderStatus}
          setViewReceipt={setViewReceipt}
          orderItems={orderItems}
          orderTotal={orderTotal}
          orderId={id}
        />
      )}
    </>
  );
};

export default OrderItem;
