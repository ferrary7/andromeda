import React from "react";
import "./Signup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import background from "../../Assets/bg.mp4";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const naviagte = useNavigate();

  const handleSignUp = (values) => {
    fetch(process.env.REACT_APP_SERVER_URL + "/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) {
          // Success
          console.log("Signed up successfully");
          naviagte(`/users/login`);
        } else {
          // Error
          console.log("Error signing up");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          src={background}
        />
        <div className="signup-form-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {(formik) => (
              <Form>
                <h1 className="signup-form-title">Sign Up</h1>
                <p className="signup-form-label">Name:</p>
                <Field
                  className="signup-form-field"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  className="signup-form-error"
                  name="name"
                  component="div"
                />
                <p className="signup-form-label">Email:</p>
                <Field
                  className="signup-form-field"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  className="signup-form-error"
                  name="email"
                  component="div"
                />
                <p className="signup-form-label">Password:</p>
                <Field
                  className="signup-form-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  className="signup-form-error"
                  name="password"
                  component="div"
                />
                <p className="signup-form-label">Confirm Password:</p>
                <Field
                  className="signup-form-field"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  className="signup-form-error"
                  name="confirmPassword"
                  component="div"
                />
                <button
                  className="signup-form-button"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Sign Up
                </button>
                <p className="signup-form-login-prompt">
                  Already have an account?<> </>
                  <Link to="/users/login">
                    <span
                      style={{
                        color: "white",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Log in
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

export default SignUp;
