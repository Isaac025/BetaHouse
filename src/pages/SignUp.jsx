import React, { useState } from "react";
import AuthWrapper from "../components/layouts/AuthWrapper";
import line1 from "../assets/line1.png";
import line2 from "../assets/line2.png";
import google from "../assets/google.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms & conditions"),
});

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    console.log("Form Submitted:", data);
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/auth/register", data);
      if (response.status === 201) {
        localStorage.setItem("email", data.email);
        toast.success(response.data.message);
        redirect("/login");
        //store users mail
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="max-w-[500px] w-full">
        <h1 className="text-[#181A20] font-[600] text-[20px] md:leading-8 md:text-[28px] mb-3">
          Join our community of home seekers and explore the possibilities that
          await.
        </h1>
        <p className="text-[#181A20D1] text-[16px] font-[400] mb-3">
          Let’s get started by filling out the information below
        </p>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="w-full flex items-center justify-between mb-4 gap-3">
            <div className="w-full">
              <label htmlFor="fname" className="labell">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                placeholder="Enter Name"
                {...register("firstName")}
                className={`md:w-[218px] w-full px-[12px] py-[15px] h-[50px] border-[2.5px] border-[#DEDFE0] rounded-[5px] outline-none 
                  ${errors.firstName ? "border border-red-300" : ""}`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="lname" className="labell">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                placeholder="Enter Name"
                {...register("lastName")}
                className={`md:w-[218px] w-full h-[50px] px-[12px] py-[15px] border-[2.5px] border-[#DEDFE0]  rounded-[5px] outline-none 
                  ${errors.lastName ? "border border-red-300" : ""}`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="labell">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              {...register("email")}
              className={`inputt border-[2.5px] border-[#DEDFE0] ${
                errors.email ? "border border-red-300" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="labell">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`inputt border-[2.5px] border-[#DEDFE0] ${
                errors.password ? "border border-red-300" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="cpassword" className="labell">
              Confirm password
            </label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`inputt border-[2.5px] border-[#DEDFE0] ${
                errors.confirmPassword ? "border border-red-300" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2 font-medium text-[16px]">
              <input
                type="checkbox"
                id="terms"
                {...register("terms")}
                className={`w-5 h-5 accent-[#3D9970] ${
                  errors.terms ? "ring-2 ring-red-200" : ""
                }`}
              />
              <label
                htmlFor="terms"
                className="text-[#181A20D1] text-[16px] font-medium"
              >
                I agree to{" "}
                <span className="text-[#3D9970]">Terms of Service</span> and{" "}
                <span className="text-[#3D9970]">Privacy Policies</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}
          </div>
          {errorMessage && (
            <div className="w-full rounded-xl py-2 my-2.5 px-4 bg-[#FF37370D] border border-[#ff3737] text-[#ff3737] flex items-center gap-3">
              <PiWarningCircle size={22} />
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            disabled={isSubmitting}
            className="bg-[#3D9970] w-full h-[64px] cursor-pointer rounded-[15px] font-[400] text-[22px] text-[#FFFFFF] "
          >
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>

          <div className="flex items-center justify-center gap-1 w-full my-4">
            <img src={line1} alt="" />
            <p className="font-[600] text-[#4F4E4E] text-[16px]">or</p>
            <img src={line2} alt="" />
          </div>

          <button className="cursor-not-allowed border-[1px] flex items-center  gap-2 mb-4 justify-center border-[#000000] w-full h-[64px] rounded-[15px] font-[400] text-[22px] text-[#292929] ">
            <img src={google} alt="google logo" /> Continue with Google
          </button>

          <div className="flex items-center justify-center gap-2 font-[400] text-[18px] ">
            <p>Already have an account? </p>
            <Link to="/login" className="text-[#3D9970]">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
