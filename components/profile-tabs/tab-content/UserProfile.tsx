import React, { useEffect, useState } from "react";

const UserProfile = ({ user, handleProfileUpdate }: any) => {
  console.log("user", user);
  const [fields, setFields] = useState(user || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const values = { ...fields };
    values[name] = value;

    console.log(values);

    setFields(values);
  };

  const handleSubmit = () => {};

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
