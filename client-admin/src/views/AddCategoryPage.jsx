import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCategorySuccess,
  fetchCategorySuccess,
} from "../actions/actionCreator";

const AddCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addCategory, setCategory] = useState({
    name: "",
  });

  const inputForm = (e) => {
    setCategory({
      ...addCategory,
      [e.target.name]: e.target.value,
    });
  };

  const submitCategories = async (e) => {
    e.preventDefault();
    const response = addCategory;
    await dispatch(addCategorySuccess(response));
    //reset
    setCategory({
      name: "",
    });
    await dispatch(fetchCategorySuccess());
    navigate("/category");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-[30vw] p-6 bg-base-100 rounded-md shadow-md">
          <h1 className="text-3xl font-semibold text-center text-black">
            Add Category
          </h1>
          <form onSubmit={submitCategories}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="name"
                name="name"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
              />
            </div>

            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryPage;
