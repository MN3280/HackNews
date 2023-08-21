import TableData from "../components/TableData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCategory, fetchCategorySuccess } from "../actions/actionCreator";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";

const CategoryPage = () => {
  const data = useSelector((state) => state.category.category);
  const isLoading = useSelector((state) => state.category.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategorySuccess());
  }, []);

  if (isLoading) return <Loading />;

  const buttonDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };
  return (
    <>
      <div className="flex justify-end mt-8 mx-8">
        <NavLink to={"/addcategory"}>
          <button className="btn ">Add New Category</button>
        </NavLink>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" w-[90vw]">
          <div className="overflow-x-auto mt-10">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category, index) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <button
                          className="btn bg-red-400 hover:bg-red-300"
                          onClick={() => buttonDeleteCategory(category.id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
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

export default CategoryPage;
