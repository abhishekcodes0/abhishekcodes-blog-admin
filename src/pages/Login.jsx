import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Page = () => {
  const { login } = useAuth();
  const [userDetails, setUserDetails] = useState({
    email: undefined,
    password: undefined,
  });
  const handleUserDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSignIn = () => {
    login(userDetails);
  };
  return (
    <div className="w-screen overflow-hidden flex justify-center">
      <div className="w-2/6 mt-32 bg-gray-50 px-10 py-20 lg:pt-10 rounded">
        <h1 className="text-3xl lg:text-5xl  font-semibold font-inter">
          Welcome Back!👋
        </h1>
        <p className="font-medium text-lg text-gray-500">
          Enter your details below to continue
        </p>

        <div className="mt-14">
          <div className="">
            <label className="text-lg font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={userDetails.email}
              onChange={handleUserDetailChange}
              autoComplete="new-email"
            />
          </div>

          <div className="mt-2">
            <label className="text-lg font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-white"
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={userDetails.password}
              onChange={handleUserDetailChange}
              autoComplete="new-password"
            />
          </div>
        </div>
        {/* <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              // value={userDetails.remember}
              // onClick={handleUserDetailChange}
            />
            <label
              className="ml-2 font-medium text-base select-none cursor-pointer"
              htmlFor="remember"
            >
              Remember Me
            </label>
          </div>
          <button className="font-medium text-base text-primary">
            Forgot Password?
          </button>
        </div> */}
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="py-3 rounded bg-black text-white text-lg font-bold select-none"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
