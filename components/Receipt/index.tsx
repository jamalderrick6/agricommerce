import OrderedItem from "components/user-orders/item/orderedItem";
import { useAuthContext } from "context/AuthContext";
import React from "react";
import { X } from "react-feather";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Receipt({
  orderStatus,
  orderItems,
  setViewReceipt,
  lastUpdatedAt,
  orderTotal,
  orderId,
}: any) {
  const { user, userAddresses } = useAuthContext();

  const downloadReceipt = () => {
    const receipt = window.document.getElementById("receipt");
    html2canvas(receipt).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      let pdfName = `Receipt-invoice${orderId}.pdf`;
      pdf.save(pdfName);
    });
  };
  return (
    <div className="receipt__container">
      <div className="buttons">
        <button
          onClick={downloadReceipt}
          className="btn btn--rounded btn--yellow"
        >
          download receipt
        </button>
        <X onClick={() => setViewReceipt(false)} />
      </div>
      <div className="receipt" id="receipt">
        <div className="header--sections">
          <div className="section">
            <div className="company">AgriCommerce</div>
            <div className="addresses">
              <div className="address_from">
                <span>From:</span>
                <span>AgriCommerce</span>
                <span>Attn: Orders</span>
                <span>TRM Drive, Roysambu</span>
                <span>Nairobi 00200</span>
                <span>Kenya</span>
                <span>+254000000111</span>
                <span>agricommerce@gmail.com</span>
              </div>
              <div className="address_to">
                <span>Shipping To:</span>
                <span>{user.username}</span>
                <span>{userAddresses[0].attributes.address}</span>
                <span>{userAddresses[0].attributes.city}</span>
                <span>Phone: {userAddresses[0].attributes.phone}</span>
                <span>{userAddresses[0].attributes.zip_code}</span>
                <span>Kenya</span>
              </div>
            </div>
          </div>
          <div className="section">
            <span className="order_No">Order #1</span>
            <span>Last Updated: {lastUpdatedAt}</span>

            <div className="order--details">
              <div>
                <span>Order Total</span>
                <span>Kshs {orderTotal}</span>
              </div>

              <div>
                <span>Payments</span>
                <span>Kshs {orderTotal}</span>
              </div>

              <div>
                <span>Order Status</span>
                <span>{orderStatus}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="items__shipped">
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
        </div>

        <div className="delivery--details">
          <span>Order will be fulfilled within 3 working days</span>
          <span>Thank you for shopping with us!</span>
        </div>
      </div>
    </div>
  );
}
