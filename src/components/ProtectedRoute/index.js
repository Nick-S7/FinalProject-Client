import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ authorized, redirect, ...props }) => {
<<<<<<< HEAD
  //   console.log('props in protected route: ', props);

=======
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
  if (authorized) {
    return <Route {...props} />;
  } else {
    return <Redirect to={redirect} />;
  }
};

export default ProtectedRoute;
