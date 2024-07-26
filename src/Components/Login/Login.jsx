import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function loginSubmit(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message)
      });
      if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({    
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{5,12}$/, "Password length should be between 5,10")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <h3>Login Now</h3>
        <form onSubmit={formik.handleSubmit}>
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

          {isLoading?
          <button type="button" className="btn bg-main text-white mt-2">
            <i className="fas fa-spinner fa-spin"></i>
          </button>: <>
          <button type="submit" className="btn bg-main text-white mt-2">Login</button>
          <Link className="btn bg-main text-white mt-2 ms-2" to="/register">Register Now</Link>
          </>}
        </form>
      </div>
    </>
  );
}
