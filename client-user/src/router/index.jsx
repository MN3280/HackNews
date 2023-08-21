import HomePage from "../views/HomePage";
import DetailPage from "../views/DetailPage";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/news/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
