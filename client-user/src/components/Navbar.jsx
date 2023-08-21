import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../stores/actions/actionCreator";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonOnClick = () => {
    // dispatch(fetchNews());
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between navbar bg-gray-200 gap-4 mb-1 border-1">
        <div className="pr-4">
          <a
            className="btn btn-ghost normal-case text-xl text-white bg-black hover:bg-black hover:text-white "
            onClick={buttonOnClick}
          >
            HACK
          </a>
        </div>
        {/* search bar */}
        <div className="form-control relative ">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered pr-20"
          />
          <button
            type="submit"
            className="absolute right-0  top-1 p-2 focus:outline-none focus:shadow-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
