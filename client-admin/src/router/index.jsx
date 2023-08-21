import HomePage from "../views/HomePage";
import AddNewsPage from "../views/AddNewsPage";
import AddCategoryPage from "../views/AddCategoryPage";
import AddAdminPage from "../views/AddAdminPage";
import LoginForm from "../views/LoginForm";
import Layout from "../components/Layout";
import CategoryPage from "../views/CategoryPage";
import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "addnews",
        element: <AddNewsPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "editnews/:id",
        element: <AddNewsPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "addcategory",
        element: <AddCategoryPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "addadmin",
        element: <AddAdminPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "category",
        element: <CategoryPage />,
        loader: () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
