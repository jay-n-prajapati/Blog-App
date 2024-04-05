import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoutesUser from './PrivateRoutes/PrivateRoutesUser/index.jsx';
import PrivateRoutesAdmin from './PrivateRoutes/PrivateRoutesAdmin/index.jsx';
import PrivateRoutesSubAdmin from './PrivateRoutes/PrivateRoutesSubAdmin/index.jsx';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoutes/PrivateRoute/index.jsx';


const Landing = React.lazy(() => import('../pages/Home'));
const UserHome = React.lazy(() => import('@/pages/Home/UserHome/index.jsx'));
const AdminHome = React.lazy(() => import('@/pages/Home/AdminHome/index.jsx'));
const SubAdminHome = React.lazy(() => import('@/pages/Home/SubAdminHome/index.jsx'));
const Auth = React.lazy(() => import('@/pages/Authantication/index.jsx'));
const Layout = React.lazy(() => import('../components/layout/Layout.jsx'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage/index.jsx'));
const Write = React.lazy(() => import('@/pages/Write'));
const Blog = React.lazy(() => import('@/pages/Blog/index.jsx'));
const NoEditor = React.lazy(() => import('@/pages/NoEditor/index.jsx'));
const Story = React.lazy(() => import('@/pages/Story/index.jsx'));
const Profile = React.lazy(() => import('@/pages/Home/Profile/index.jsx'));
const Library = React.lazy(() => import('@/pages/Home/Library/index.jsx'));

export const Router = () => {
  const { isAuth , user, subAdmin, admin } = useSelector((state) => state.auth);
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Landing />,
        },
        {
          path: 'auth',
          element: <Auth formType='signin' defaultOpen={true} />,
        },
        {
          path: '/blog/:id',
          element: <Blog/>,
        },
        {
          element: <PrivateRoute isAuth={isAuth} />,
          children: [
            {
              path: 'write',
              element: <Write />,
            },
            {
              path: 'stories',
              element: <Story />,
            },
            {
              path: 'profile',
              element: <Profile />,
            },
            {
              path: 'library',
              element: <Library />,
            },
            {
              path: 'no-editor',
              element: <NoEditor />,
            },
          ],
        },
        {
          element: <PrivateRoutesUser isUserAuth={user ? true : false} />,
          children: [
            {
              path: 'home',
              element: <UserHome />,
            }
          ],
        },
        {
          element: <PrivateRoutesAdmin isAdminAuth={admin ? true : false} />,
          children: [
            {
              path: 'admin-home',
              element: <AdminHome />,
            }
          ],
        },
        {
          element: <PrivateRoutesSubAdmin isSubAdminAuth={subAdmin ? true : false} />,
          children: [
            {
              path: 'subAdmin-home',
              element: <SubAdminHome />,
            }
          ],
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);
};
