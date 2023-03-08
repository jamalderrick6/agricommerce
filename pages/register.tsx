import { useState } from "react";
import Layout from "../layouts/Main";
import Link from "next/link";
import { registerUser, loginUser } from "./api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogged } from "store/reducers/user";
import { useRouter } from "next/router";
import { useAuthContext } from "context/AuthContext";
import { API } from "utils/constant";
import { Alert, message, Spin } from "antd";
import { setToken } from "utils/helpers";

const RegisterPage = () => {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const objValues = { ...values };

    objValues[name] = value;
    setValues(objValues);
  };

  const createUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome to Agricommerce ${data.user.username}!`);

        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          {error ? (
            <Alert
              className="alert_error"
              message={error}
              type="error"
              closable
              afterClose={() => setError("")}
            />
          ) : null}
          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            <form className="form" onSubmit={createUser}>
              <div className="form__input-row">
                <input
                  name="username"
                  value={values.username}
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
                Sign up {isLoading && <Spin size="small" />}
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
