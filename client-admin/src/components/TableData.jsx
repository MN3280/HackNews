import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteNews, editNewsById } from "../actions/actionCreator";
const TableData = ({ title, content, id, category, author }) => {
  const dispatch = useDispatch();

  const buttonDelete = (id) => {
    console.log(id, "id dari table");
    dispatch(deleteNews(id));
  };

  const buttonEdit = (id) => {
    console.log(id, "id dari table buton edit");
    dispatch(editNewsById(id));
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{category}</td>
      <td>{author}</td>
      <td>
        <div style={{ display: "flex", gap: "1rem" }}>
          <NavLink to={`/editnews/${id}`}>
            <button
              className="btn bg-blue-400 hover:bg-blue-200 "
              onClick={() => buttonEdit(id)}
            >
              Edit
            </button>
          </NavLink>
          <button className="btn bg-red-400" onClick={() => buttonDelete(id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableData;
