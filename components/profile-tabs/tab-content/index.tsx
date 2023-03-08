import React from "react";
import UserProfile from "./UserProfile";
import OrderSummary from "./OrderSummary";
import SavedItems from "./SavedItems";

const ProfileContent = ({ tab, user, handleProfileUpdate }: any) => {
  const content = {
    Profile: (
      <UserProfile user={user} handleProfileUpdate={handleProfileUpdate} />
    ),
    "Saved Items": <SavedItems />,
    "Order Summary": <OrderSummary />,
  };
  return <section className="profile-content">{content[tab]}</section>;
};

export default ProfileContent;
