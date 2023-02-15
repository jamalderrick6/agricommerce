import { updateUser } from "pages/api/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log("user", user);
  const [fields, setFields] = useState({
    Name: "",
    Email: "",
    "Phone Number": "",
  });

  useEffect(() => {
    setFields({
      Name: user.name,
      Email: user.email,
      "Phone Number": user.phone,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const values = { ...fields };
    values[name] = value;

    console.log(values);

    setFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { ...fields };
    console.log("payload", payload);
    payload["token"] = user.token;
    const data = await updateUser(payload);
    if ([200, 201].includes(data.response.status)) {
      console.log("data", data);
    } else {
      alert("Profile not updated");
    }
  };
  return (
    <section className="profile-content">
      <div className="profile-content__intro">
        <h2>Profile</h2>
      </div>

      <div className="profile-content__body">
        <form className="profile-content__form" onSubmit={handleSubmit}>
          <div className="grid">
            {Object.keys(fields).map((field, index) => {
              return (
                <div className="input">
                  <label>{field}</label>
                  <input
                    onChange={handleChange}
                    name={field}
                    type="text"
                    value={fields[field]}
                  />
                </div>
              );
            })}
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
