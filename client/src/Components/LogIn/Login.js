import React from "react";
import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import background from "../../Assets/bg.mp4";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User authenticated");
        localStorage.setItem("token", data.token);
        navigate(`/`);
      } else {
        console.log(data.error);
        setErrors({ password: data.error });
      }
    } catch (err) {
      console.log(err);
      setErrors({ password: "Something went wrong. Please try again." });
    }

    setSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          src={background}
        />
        <div className="login-form-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {(formik) => (
              <Form>
                <h1 className="login-form-title">Log In</h1>
                <p className="login-form-label">Email:</p>
                <Field
                  className="login-form-field"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  className="login-form-error"
                  name="email"
                  component="div"
                />
                <p className="login-form-label">Password:</p>
                <Field
                  className="login-form-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  className="login-form-error"
                  name="password"
                  component="div"
                />
                <button
                  className="login-form-button"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Log In
                </button>
                <p className="login-form-signup-prompt">
                  Don't have an account yet?{" "}
                  <Link to="/users/signup">
                    <span
                      style={{
                        color: "white",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Sign up
                    </span>
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
