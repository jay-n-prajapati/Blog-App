import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRoute({ isAuth = false }) {
  return isAuth ? <Outlet /> : <Navigate to="/auth" />;
}

PrivateRoute.propTypes = {
  isAuth : PropTypes.bool
}

export default PrivateRoute;
