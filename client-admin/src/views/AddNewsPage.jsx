import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  addNewsSuccess,
  editNewsSuccess,
  fetchCategorySuccess,
  fetchNewsSuccess,
} from "../actions/actionCreator";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddNewsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const { category } = useSelector((state) => state.category);

  const { newsDetail } = useSelector((state) => state.news);
  console.log(newsDetail, "news detail di page");

  const [addItem, setAddItem] = useState({
    title: "",
    content: "",
    categoryId: 0,
    name: "",
    name1: "",
    name2: "",
    imgUrl: "",
  });

  const inputForm = (e) => {
    setAddItem({
      ...addItem,
      [e.target.name]: e.target.value,
    });
  };

  const submitAddNews = async (e) => {
    e.preventDefault();

    if (pathname !== "/addnews") {
      const response = addItem;
      await dispatch(editNewsSuccess(id, response));
      // await dispatch(fetchNewsSuccess());
      // navigate("/");
    } else {
      const response = addItem;
      dispatch(addNewsSuccess(response));
      setAddItem({
        title: "",
        content: "",
        categoryId: 0,
        name: "", // untuk tags karena dr BE req.body nya name
        name1: "",
        name2: "",
        imgUrl: "",
      });

      // await dispatch(fetchNewsSuccess());

      // navigate("/");
    }
    await dispatch(fetchNewsSuccess());

    navigate("/");
  };

  //pdhal task beda
  useEffect(() => {
    setAddItem(newsDetail);
    //logic filter dsni nge fetch ny dsni
  }, [newsDetail]);

  useEffect(() => {
    dispatch(fetchNewsSuccess());
    dispatch(fetchCategorySuccess());
  }, []);

  return (
    <>
      <div className=" flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-[50vw] p-6 m-auto bg-base-100 rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-black ">
            Add New News
          </h1>
          <form className="mt-6" onSubmit={submitAddNews}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                News Name:
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter News Name here ..."
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={newsDetail ? newsDetail?.response?.title : ""}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="content"
                className="block text-sm font-semibold text-gray-800"
              >
                Content:
              </label>
              <textarea
                type="text"
                placeholder="Enter content here..."
                name="content"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={newsDetail ? newsDetail?.response?.content : ""}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
                htmlFor="category"
                id="category"
              >
                Category:
              </label>
              <select
                type="text"
                id="category"
                name="categoryId"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={
                  newsDetail ? newsDetail?.response?.categoryId : ""
                }
              >
                <option value={""}>Select Category</option>
                {category.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
                htmlFor="category"
              >
                Tags:
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter tags here..."
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={newsDetail ? newsDetail?.tags?.name : ""}
              />
              <input
                type="text"
                name="name1"
                placeholder="Enter tags here..."
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={newsDetail ? newsDetail?.tags?.name1 : ""}
              />
              <input
                type="text"
                name="name2"
                placeholder="Enter tags here..."
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={newsDetail ? newsDetail?.tags?.name2 : ""}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-gray-800"
                htmlFor="imgUrl"
              >
                Image URL:
              </label>
              <input
                type="text"
                name="imgUrl"
                placeholder="Enter image URL here..."
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-indigo-500 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={inputForm}
                defaultValue={newsDetail ? newsDetail?.response?.imgUrl : ""}
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewsPage;
