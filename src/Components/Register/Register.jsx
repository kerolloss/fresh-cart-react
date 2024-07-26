import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message)
      });
      if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
  }

  let phoneRegExp = /^01[0125][0-9]{8}$/;
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string().matches(phoneRegExp, "Phone is invalid"),
    // .required("Phone is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{5,12}$/, "Password length should be between 5,10")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and rePassword are not the same")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <h3>Register Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label className="pt-3 pb-1" htmlFor="name">
            Name:
          </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className="form-control" name="name" id="name"
          />
          {/* <div className="alert alert-danger p-2 mt-2">{formik.values.name}, {formik.errors.name}</div> */}
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : null}

          <label className="pt-3 pb-1" htmlFor="phone">
            Phone:
          </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="form-control" name="phone" id="phone" type="tel"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : null}

          <label className="pt-3 pb-1" htmlFor="email">
            Email:
          </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className="form-control" name="email" id="email" type="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : null}

          <label className="pt-3 pb-1" htmlFor="password">
            Password:
          </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="form-control" name="password" id="password" type="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : null}

          <label className="pt-3 pb-1" htmlFor="rePassword">
            Repassword:
          </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className="form-control" name="rePassword" id="rePassword" type="password"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
            </div>
          ) : null}
          {isLoading? 
          <button type="button" className="btn bg-main text-white mt-2">
            <i className="fas fa-spinner fa-spin"></i>
          </button>: <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">Register</button>}
          
        </form>
      </div>
    </>
  );
}
