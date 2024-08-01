import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const PrivateRoute = ({ children, role, redirectTo }) => {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login-client" />;
  }

  if (role && role !== userRole) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
  redirectTo: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectTo: '/',
};

export default PrivateRoute;
