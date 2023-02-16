import React from "react";
import "./Signup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import background from "../../Assets/bg.mp4";
import { Link } from "@material-ui/core";
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
    
    /* const handleSignUp = async (values) => {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }; 
    */

  const handleSignUp = (values) => {
    // Store values in local storage or send to backend API
    localStorage.setItem("name", values.name);
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
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
                <Link to='/home'>
                    <span style={{color: 'white', textDecoration: 'underline', cursor: 'pointer'}}>Log in</span>
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
