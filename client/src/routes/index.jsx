import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoutesAdmin from './PrivateRoutes/PrivateRoutesAdmin/index.jsx';
import PrivateRoutesSubAdmin from './PrivateRoutes/PrivateRoutesSubAdmin/index.jsx';
import PrivateRoute from './PrivateRoutes/PrivateRoute/index.jsx';

const Landing = React.lazy(() => import('../pages/Home'));
const UserHome = React.lazy(() => import('@/pages/Home/Home.jsx'));
const Auth = React.lazy(() => import('@/pages/Authantication/index.jsx'));
const Layout = React.lazy(() => import('../components/layout/Layout.jsx'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage/index.jsx'));
const Write = React.lazy(() => import('@/pages/Write'));
const Blog = React.lazy(() => import('@/pages/Blog/index.jsx'));
const NoEditor = React.lazy(() => import('@/pages/NoEditor/index.jsx'));
const Story = React.lazy(() => import('@/pages/Story/index.jsx'));
const Profile = React.lazy(() => import('@/pages/Profile/index.jsx'));
const Library = React.lazy(() => import('@/pages/Library/index.jsx'));
const AdminDashBoard = React.lazy(() => import('@/pages/Dashboard/Admin/index.jsx'));
const SubAdminDashboard = React.lazy(() => import('@/pages/Dashboard/SubAdmin/index.jsx'));
const SpecificBlogs = React.lazy(() => import('@/pages/SpecificBlogs/index.jsx'));
const SpecificSubBlogs = React.lazy(() => import('@/pages/SpecificSubBlogs/index.jsx'));

export const Router = () => {
  const { isAuth, subAdmin, admin } = useSelector((state) => state.auth);
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
          element: <Blog />,
        },
        {
          element: <PrivateRoute isAuth={isAuth} />,
          children: [
            {
              path: 'home',
              element: <UserHome />,
            },
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
              path: 'blogs/category/:category',
              element: <SpecificBlogs />,
            },
            {
              path: 'blogs/subCategory/:subCategory',
              element: <SpecificSubBlogs />,
            },
            {
              path: 'no-editor',
              element: <NoEditor />,
            },
          ],
        },
        {
          element: <PrivateRoutesAdmin isAdminAuth={admin ? true : false} />,
          children: [
            {
              path: 'adminDashboard',
              element: <AdminDashBoard />,
            },
          ],
        },
        {
          element: <PrivateRoutesSubAdmin isSubAdminAuth={subAdmin ? true : false} />,
          children: [
            {
              path: 'subAdminDashboard',
              element: <SubAdminDashboard />,
            },
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
