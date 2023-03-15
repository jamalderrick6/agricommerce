import AddressForm from "./address-form";
import UserDetails from "./user-details";
import UserAddresses from "./user-addresses";
import { useAuthContext } from "context/AuthContext";
import { useState } from "react";

const UserProfile = () => {
  const { user, userAddresses } = useAuthContext();
  const [addressInView, setAddressInView] = useState(null);

  const viewAddress = (addId) => {
    console.log("addId", addId);
    if (addId) {
      let address = userAddresses.filter((address) => address.id === addId);
      console.log("address", address);
      setAddressInView(address);
    } else {
      setAddressInView(null);
    }
  };
  return (
    <section className="profile">
      <div className="container">
        <div className="profile__intro">
          <h3 className="profile__title">Your Profile</h3>
          <a href="/orders" className="btn btn--rounded btn--yellow">
            My orders
          </a>
        </div>

        <div className="profile-grid">
          <div className="grid">
            <UserDetails user={user} />
          </div>
          <div className="grid">
            <UserAddresses
              viewAddress={viewAddress}
              addressInView={addressInView}
              addresses={userAddresses}
            />
          </div>
          <div className="grid">
            <AddressForm
              addressInView={addressInView}
              user={user}
              setAddressInView={setAddressInView}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
