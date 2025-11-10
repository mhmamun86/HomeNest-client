import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/auth/Login';
import Register from '../components/pages/auth/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddProperty from '../components/pages/listingPages/AddProperty';
import MyProperty from '../components/pages/listingPages/MyProperty';

export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'signup',
        Component: Register,
      },
      {
        path: 'add-property',
        element: (
          <PrivateRoute>
            <AddProperty></AddProperty>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-properties',
        element: (
          <PrivateRoute>
            <MyProperty></MyProperty>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
