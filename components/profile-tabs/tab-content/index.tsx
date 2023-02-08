import React from "react";
import UserProfile from "./UserProfile";
import OrderSummary from "./OrderSummary";
import SavedItems from "./SavedItems";

const ProfileContent = ({ tab }: any) => {
  const content = {
    Profile: <UserProfile />,
    "Saved Items": <SavedItems />,
    "Order Summary": <OrderSummary />,
  };
  return <section className="profile-content">{content[tab]}</section>;
};

export default ProfileContent;
