import { useRouter } from "next/router";

const UserAddresses = ({ text, addresses, addressInView, viewAddress }) => {
  const router = useRouter();
  const redirect = () => {
    router.push("/profile");
  };
  return (
    <div className="block">
      <h3 className="block__title">{text ? text : "Saved Addresses"}</h3>
      <div className="address--list">
        {addresses &&
          addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <div
                onClick={() => viewAddress(address.id)}
                className={
                  "address " +
                  (addressInView &&
                    addressInView[0].id === address.id &&
                    "selected")
                }
              >
                <span>{`${address.attributes.zip_code}-${address.attributes.address} ,${address.attributes.city} `}</span>
              </div>
            );
          })}

        <div
          onClick={() => (text ? redirect() : viewAddress(null))}
          className="address"
        >
          <span>Add new Address</span>
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
