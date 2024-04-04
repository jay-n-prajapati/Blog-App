import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRouteEditor({ isAuth = false }) {
  return isAuth ? <Outlet /> : <Navigate to="/auth" />;
}

PrivateRouteEditor.propTypes = {
  isAuth : PropTypes.bool
}

export default PrivateRouteEditor;
