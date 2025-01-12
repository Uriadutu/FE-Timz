import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/kelola-invoice");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ Username, Password }));
  };

  return (
    <div className="bg-[#FFAF10] h-[100vh] flex justify-center items-center">
      <section className="">
        <div className="">
          <div className=" is-center">
            <div className="is-4">
              <form
                onSubmit={Auth}
                className="relative w-[350px] bg-opacity-80 sm:bg-white drop-shadow-lg sm:shadow-lg sm:rounded-lg px-5 py-10 sm:px-10 sm:py-10"
              >
                <div className="flex justify-center">
                  <p className="font-bold text-xl mb-4">Login</p>
                </div>
                  <div className="">
                    {isError && (
                      <div className="px-4 py-2 text-red-600 bg-red-100 border border-red-300 rounded-md">
                        {message}
                      </div>
                    )}
                  </div>

                <p>Username</p>
                <div className="mb-4 w-full flex justify-center">
                  <input
                    type="text"
                    className="input w-full p-2"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <p>Password</p>
                <div className="w-full flex justify-center">
                  <input
                    type="password"
                    className="input w-full p-2"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className=" mt-4">
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#FFAF10] bg-opacity-80 text-white rounded"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
