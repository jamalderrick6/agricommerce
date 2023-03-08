import { message } from "antd";
import { addAddress } from "pages/api/address";
import { useEffect, useState } from "react";

const AddressForm = ({ addressInView }) => {
  const [values, setValues] = useState({
    email: "",
    address: "",
    first_name: "",
    last_name: "",
    city: "",
    zip_code: "",
    phone: "",
  });
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    console.log("address in view", addressInView);
    if (addressInView) {
      setValues(addressInView[0].attributes);
    }
  }, [addressInView]);

  const handleChange = (e) => {
    setEmptyFields([]);
    const { name, value } = e.target;
    let vals = { ...values };
    vals[name] = value;

    setValues(vals);
  };

  const checkEmptyFields = () => {
    let fields = [...emptyFields];
    Object.keys(values).forEach((field) => {
      if (values[field] == "") {
        fields.push(field);
      }
    });

    setEmptyFields(fields);

    if (fields.length > 0) {
      message.error("Please add all fields");
      return true;
    } else {
      return false;
    }
  };

  const createAddress = async (e) => {
    e.preventDefault();
    let val = await checkEmptyFields();

    if (!val) {
      await addAddress(values);
    }
  };
  return (
    <div className="block">
      <h3 className="block__title">Address</h3>
      <form onSubmit={createAddress} className="form">
        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("email") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              onChange={handleChange}
              placeholder="Email"
              name="email"
              value={values.email}
            />
          </div>

          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("address") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              value={values.address}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("first_name") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              placeholder="First name"
              onChange={handleChange}
              name="first_name"
              value={values.first_name}
            />
          </div>

          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("city") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              placeholder="City"
              onChange={handleChange}
              name="city"
              value={values.city}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("last_name") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              onChange={handleChange}
              placeholder="Last name"
              name="last_name"
              value={values.last_name}
            />
          </div>

          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("zip_code") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              placeholder="Postal code / ZIP"
              onChange={handleChange}
              name="zip_code"
              value={values.zip_code}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              style={{
                border: emptyFields.includes("phone") && "1px solid #f00",
              }}
              className="form__input form__input--sm"
              type="text"
              placeholder="Phone number"
              onChange={handleChange}
              name="phone"
              value={values.phone}
            />
          </div>
        </div>
        <button type="submit" className="btn btn--rounded btn--yellow">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
