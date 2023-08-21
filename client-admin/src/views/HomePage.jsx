import TableData from "../components/TableData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategorySuccess,
  fetchNews,
  fetchNewsSuccess,
} from "../actions/actionCreator";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.news.news);
  const isLoading = useSelector((state) => state.news.isLoading);

  useEffect(() => {
    dispatch(fetchNewsSuccess());
    dispatch(fetchCategorySuccess());
  }, []);
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex justify-end mt-2">
        <NavLink to={"/addnews"}>
          <button className="btn mr-3">Add New News</button>
        </NavLink>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <div className=" w-[90vw] ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((post, index) => {
                  return (
                    <TableData
                      key={post.id}
                      title={post.title}
                      content={post.content}
                      category={post.Category.name}
                      author={post.User.username}
                      id={post.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
