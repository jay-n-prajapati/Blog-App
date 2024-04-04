import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRoutesAdmin({ isAdminAuth = false }) {
  return isAdminAuth ? <Outlet /> : <Navigate to="/auth" />;
}

PrivateRoutesAdmin.propTypes = {
  isAdminAuth : PropTypes.bool
}

export default PrivateRoutesAdmin;
