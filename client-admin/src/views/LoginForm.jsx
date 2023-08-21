import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCategorySuccess,
  fetchNewsSuccess,
  userLoginSuccess,
} from "../actions/actionCreator";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //bikin state untuk set value awal
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  //set value
  const inputForm = (event) => {
    //panggil si setCredentials
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const res = credentials;
    await dispatch(userLoginSuccess(res));
    //reset values
    setCredentials({
      email: "",
      password: "",
    });
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchNewsSuccess());
    dispatch(fetchCategorySuccess());
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-80 p-6 m-auto bg-base-100 rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-black ">
            Sign in
          </h1>
          <form className="mt-6" onSubmit={submitForm}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
