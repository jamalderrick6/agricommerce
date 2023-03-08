import Layout from "../layouts/Main";
import Breadcrumb from "../components/breadcrumb";
import ProfileTabs from "components/profile-tabs";
import ProfileContent from "components/profile-tabs/tab-content";
import { useState } from "react";
import { useAuthContext } from "context/AuthContext";
import { message, Spin } from "antd";
import { API } from "utils/constant";
import { getToken } from "utils/helpers";

const User = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();
  const tabs = ["Profile", "Saved Items", "Order Summary"];
  const [selectedTab, setSelectedTab] = useState("Profile");
  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setUser(responseData);
      message.success("Data saved successfully!");
    } catch (error) {
      console.error(Error);
      message.error("Error While Updating the Profile!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Layout>
      <Breadcrumb name="User" />
      <section className="profiles-page">
        <div className="container">
          <ProfileTabs
            tabs={tabs}
            setSelectedTab={(tab: string) => setSelectedTab(tab)}
          />
          <ProfileContent
            user={user}
            handleProfileUpdate={handleProfileUpdate}
            tab={selectedTab}
          />
        </div>
      </section>
    </Layout>
  );
};

export default User;
