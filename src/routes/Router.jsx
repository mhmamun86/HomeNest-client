import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/auth/Login';
import Register from '../components/pages/auth/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddProperty from '../components/pages/listingPages/AddProperty';
import MyProperty from '../components/pages/listingPages/MyProperty';
import MyRatings from '../components/pages/ratingPages/MyRatings';
import Properties from '../components/pages/listingPages/Properties';
import NotFound from '@/components/common/NotFound';
import PropertyDetails from '@/components/pages/listingPages/PropertieDetails';

export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <NotFound></NotFound>,
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
        path: 'properties',
        Component: Properties,
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
      {
        path: 'propertie-details/:id',
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-ratings',
        element: (
          <PrivateRoute>
            <MyRatings></MyRatings>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
