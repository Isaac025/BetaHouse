import React, { useState } from "react";
import AuthWrapper from "../components/layouts/AuthWrapper";
import line1 from "../assets/line1.png";
import line2 from "../assets/line2.png";
import google from "../assets/google.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { axiosInstance } from "../../utils/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirect = useNavigate();
  const { login } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    console.log("Form Submitted:", data);
    setIsSubmitting(true);
    try {
      const { data: mydata } = await axiosInstance.post("/auth/login", data);
      console.log(mydata);
      login(mydata.token, mydata.user);
      redirect("/home");
      toast.success(mydata.message);

      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="lg:p-[50px]  lg:pl-[80px] md:w-[600px]">
        <h1 className="text-[#181A20] font-[600] text-[20px]  md:text-[28px] mb-1">
          Welcome Back to BetaHouse!
        </h1>
        <p className="text-[#181A20D1] text-[16px] font-[400] mb-3">
          Lets get started by filling out the information below
        </p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label htmlFor="email" className="labell">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="inputt border-[2.5px] border-[#DEDFE0]"
              {...register("email")}
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
              className="inputt border-[2.5px] border-[#DEDFE0]"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between font-medium text-[16px] mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="bg-[#3D9970] p-2 w-[20px] h-[20px]"
              />
              <label
                htmlFor="terms"
                className="text-[#716F6F] text-[16px] font-medium"
              >
                Remember Me
              </label>
            </div>
            <Link className="text-[#EC5E5E]">Forgot Password</Link>
          </div>
          {errorMessage && (
            <div className="w-full rounded-xl py-2 my-2.5 px-4 bg-[#FF37370D] border border-[#ff3737] text-[#ff3737] flex items-center gap-3">
              <PiWarningCircle size={22} />
              <p>{errorMessage}</p>
            </div>
          )}
          <button
            disabled={isSubmitting}
            className="bg-[#3D9970] w-full cursor-pointer  h-[64px] rounded-[15px] font-[400] text-[22px] text-[#FFFFFF] "
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-md text-black"></span>
            ) : (
              "Login"
            )}
          </button>
          <div className="flex items-center justify-center gap-1 w-full  my-4 ">
            <img src={line1} alt="" />
            <p className="font-[600] text-[#4F4E4E] text-[16px]">or</p>
            <img src={line2} alt="" />
          </div>
          <button className="border-[1px] cursor-not-allowed flex items-center gap-2 mb-4 justify-center border-[#000000] w-full  h-[64px] rounded-[15px] font-[400] text-[22px] text-[#292929] ">
            <img src={google} alt="google logo" /> Continue with Google
          </button>
          <div className="flex items-center justify-center gap-2 font-[400] text-[18px] ">
            <p>New User? </p>
            <Link to="/signup" className="text-[#3D9970]">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Login;
