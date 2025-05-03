import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../auth';

export default function PrivateRoute({ children, role }) {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  
  return children;
}
