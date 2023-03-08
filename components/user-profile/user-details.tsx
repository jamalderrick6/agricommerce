const UserDetails = ({ user }) => {
  return (
    <div className="block">
      <h3 className="block__title">Personal Information</h3>
      <form className="form">
        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="email"
              disabled
              value={user?.email}
            />
          </div>

          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="phone"
              disabled
              value={user?.phone}
            />
          </div>
        </div>

        <div className="form__input-row form__input-row--two">
          <div className="form__col">
            <input
              className="form__input form__input--sm"
              type="text"
              placeholder="username"
              disabled
              value={user?.username}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
