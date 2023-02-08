import Layout from "../layouts/Main";
import Breadcrumb from "../components/breadcrumb";
import ProfileTabs from "components/profile-tabs";
import ProfileContent from "components/profile-tabs/tab-content";
import { useState } from "react";

const User = () => {
  const tabs = ["Profile", "Saved Items", "Order Summary"];
  const [selectedTab, setSelectedTab] = useState("Profile");
  return (
    <Layout>
      <Breadcrumb name="User" />
      <section className="profiles-page">
        <div className="container">
          <ProfileTabs
            tabs={tabs}
            setSelectedTab={(tab: string) => setSelectedTab(tab)}
          />
          <ProfileContent tab={selectedTab} />
        </div>
      </section>
    </Layout>
  );
};

export default User;
