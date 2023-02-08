import { useState } from "react";
import Layout from "../layouts/Main";
import Link from "next/link";
import { registerUser, loginUser } from "./api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogged } from "store/reducers/user";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const objValues = { ...values };

    objValues[name] = value;
    setValues(objValues);
  };

  const saveUser = (data: any) => {
    dispatch(
      setUserLogged({
        name: data.json.user.name,
        token: data.json.token,
      })
    );
  };

  const createUser = async (e) => {
    e.preventDefault();
    const data = await registerUser(values);

    if ([200, 201].includes(data.response.status)) {
      const data = await loginUser({
        email: values.email,
        password: values.password,
      });
      if ([200, 201].includes(data.response.status)) {
        await saveUser(data);
        router.push("/");
      }
    } else {
      alert("User already exists!");
    }
  };
  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            <form className="form" onSubmit={createUser}>
              <div className="form__input-row">
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="form__input"
                  placeholder="Full Name"
                  type="text"
                />
              </div>

              <div className="form__input-row">
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="form__input"
                  placeholder="Email"
                  type="text"
                />
              </div>

              <div className="form__input-row">
                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="form__input"
                  type="Password"
                  placeholder="Password"
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                    />
                    <span className="checkbox__check"></span>
                    <p>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">
                  <a href="#">Are you already a member?</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
