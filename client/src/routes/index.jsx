import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import About from "../pages/About/index.jsx";
import ErrorPage from "../pages/ErrorPage/index.jsx";
import Home from "../pages/Home/index.jsx";

export const Router = () => {
  return createBrowserRouter([
    {
      path : '/',
      element: <Layout />,
      children: [
        {
          path : '',
          element : <Home/>
        },{
          path : 'about',
          element : <About/>
        }
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
};


