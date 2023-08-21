import { useNavigate } from "react-router-dom";

const Card = ({ title, content, Tags }) => {
  // const navigate = useNavigate();

  // console.log(Tags, "dari card");
  return (
    <>
      {/* batas */}
      <div className="card w-[50vw] bg-[#f4f4f4] mt-3">
        <div className="card-body" style={{ cursor: "pointer" }}>
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
          <div className="card-actions justify-end">
            {Tags.map((el) => {
              return (
                <div className="badge badge-outline" key={el?.id}>
                  {el.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default Card;
