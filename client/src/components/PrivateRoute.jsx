import React, { useCallback, useEffect, useDispatch, useSelector } from 'react';

import { Redirect, Route } from 'react-router-dom';

import useToken from './useLocalStorage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useToken();

  // const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      console.log('vrau');
    }
    if (user) {
      console.log('there is user');
    }
  }, [user]);
  // Add your own authentication on the below line.

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
