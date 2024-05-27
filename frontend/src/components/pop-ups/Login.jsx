import React from "react";
import Buttons from "../buttons/NormalButtons";
// import { useDispatch } from "react-redux";
// import { Login as loginAction } from "../../store/userSlice";

import { getLoginUrl, headers } from "../../utils/urls";

const Login = () => {
  const dispatch = useDispatch();
  const getSignInUrl = async () => {
    try {
      console.log(getLoginUrl);
      const response = await fetch(getLoginUrl, {
        method: "GET",
        headers,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success === true) {
        // dispatch(loginAction(data.user));
        window.location.href = data.url;
      } else {
        console.error("Error in response:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h3 className="text-center text-3xl text-blue font-semibold">
        Welcome to Slatey!
      </h3>
      <p className="text-center mt-3">
        Unlock enhanced writing productivity by logging in or signing up.
      </p>
      <div className="flex justify-center items-center flex-col gap-4 my-8">
        <Buttons
          type="login"
          text="Sign in with Google"
          action={getSignInUrl}
        />
        <Buttons type="red" text="Cancel" />
      </div>
      <div className="max-w-lg mx-auto information flex justify-between flex-col items-center text-gray-500 gap-1 text-xs">
        <span className="font-semibold"> Storage Note</span>
        <span className="text-center">
          Slatey keeps your files organized in a secure folder within your
          Google Drive. We only access this folder, ensuring the privacy of your
          other files.
        </span>
      </div>
    </div>
  );
};

export default Login;
