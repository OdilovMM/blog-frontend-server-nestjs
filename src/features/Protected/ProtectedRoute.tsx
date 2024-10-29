import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../auth/slice/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return user?.user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user.user ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="auth" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
