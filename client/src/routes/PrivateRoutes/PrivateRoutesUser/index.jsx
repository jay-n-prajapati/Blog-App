import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRoutesUser({ isUserAuth = false }) {       // have to change here
  return isUserAuth ? <Outlet /> : <Navigate to="/auth" />;
}

PrivateRoutesUser.propTypes = {
  isUserAuth : PropTypes.bool
}

export default PrivateRoutesUser;
