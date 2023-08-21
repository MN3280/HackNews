import Card from "../components/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../stores/actions/actionCreator";

const HomePage = () => {
  const data = useSelector((state) => state?.news?.news);
  const isLoading = useSelector((state) => state?.news?.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 mt-8 ml-8">
        {data?.map((el, index) => {
          return (
            <NavLink to={`/news/${el.id}`} key={el?.id}>
              <Card
                key={el?.id}
                title={el.title}
                content={el.content}
                Tags={el.Tags}
                id={el.id}
              />
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
export default HomePage;
