import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ErrorPage from "../pages/ErrorPage/index.jsx";
import PrivateRoutesUser from "./PrivateRoutes/PrivateRoutesUser/index.jsx";
import PrivateRoutesAdmin from "./PrivateRoutes/PrivateRoutesAdmin/index.jsx";
import PrivateRoutesSubAdmin from "./PrivateRoutes/PrivateRoutesSubAdmin/index.jsx";
import Landing from "../pages/Home/index.jsx";
import UserHome from "@/pages/Home/UserHome/index.jsx";
import AdminHome from "@/pages/Home/AdminHome/index.jsx";
import SubAdminHome from "@/pages/Home/SubAdminHome/index.jsx";
import Auth from "@/pages/Authantication/index.jsx";

export const Router = () => {
  return createBrowserRouter([
    {
      path : '/',
      element: <Layout />,
      children: [
        {
          path : '',
          element : <Landing/>
        },
        {
          path : 'auth',
          element : <Auth formType="signup" defaultOpen={true}/>
        },
        {
          element : <PrivateRoutesUser/>,
          children : [
            {
              path : 'home',
              element : <UserHome/>
            }
          ]
        }
        ,{
          element : <PrivateRoutesAdmin/>,
          children : [
            {
              path : 'admin-users',
              element : <AdminHome/>
            }
          ]
        }
        ,{
          element : <PrivateRoutesSubAdmin/>,
          children : [
            {
              path : 'subAdmin-blogs',
              element : <SubAdminHome/>
            }
          ]
        }
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
};


