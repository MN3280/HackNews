import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { newsById } from "../stores/actions/actionCreator";
import Loading from "../components/Loading";

const DetailPage = () => {
  const params = useParams();
  const data = useSelector((state) => state.news.newsDetail);
  const isLoading = useSelector((state) => state.news.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newsById(params?.id));
  }, []);

  if (isLoading) return <Loading />;

  console.log(data, "detailpage");
  // console.log(isLoading, "loading 27 detail");

  return (
    <>
      <div className="flex justify-center  my-10 ">
        <div className=" card card-compact w-[80vw] h-max bg-base-100 shadow-xl">
          <figure>
            <img src={data.imgUrl} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p>{data.content}</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailPage;
