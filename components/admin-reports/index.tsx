import { useState } from "react";
import OrderReports from "./content/orders";
import UserReports from "./content/users";
import StockReports from "./content/stock";

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState("orders");
  return (
    <section className="profile">
      <div className="container">
        <div className="profile__intro">
          <h3 className="profile__title">Reports</h3>
        </div>

        <div className="reports-content">
          <div className="reports">
            <div
              className={"report" + (activeTab === "orders" ? " selected" : "")}
              onClick={() => setActiveTab("orders")}
            >
              <span>View Orders</span>
            </div>
            <div
              className={"report" + (activeTab === "users" ? " selected" : "")}
              onClick={() => setActiveTab("users")}
            >
              <span>View Users</span>
            </div>
            <div
              className={"report" + (activeTab === "stock" ? " selected" : "")}
              onClick={() => setActiveTab("stock")}
            >
              <span>View Stock</span>
            </div>
          </div>

          <div className="order-section">
            {activeTab === "orders" ? (
              <OrderReports />
            ) : activeTab === "users" ? (
              <UserReports />
            ) : (
              <StockReports />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReports;
