import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../stores/actions/actionCreator";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonOnClick = () => {
    dispatch(fetchNews());
    navigate("/");
  };

  //untuk search bar
  const [isCollapsed, setCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchQuery);
    dispatch(fetchNews({ title: searchQuery }));
    setSearchQuery("");
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
        <div className="flex justify-end ">
          {isCollapsed ? (
            <div className="relative mx-auto w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border  border-[#050505]  w-full py-2 pl-4 pr-12 text-[#050505]"
                placeholder="Search"
                style={{ borderRadius: "4px" }}
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-0 top-0 mt-2 mr-2 focus:outline-none bg-[#DDD9CE9]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              <button
                onClick={toggleCollapse}
                className="absolute right-0 top-0 mt-2 mr-12 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button onClick={toggleCollapse}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
