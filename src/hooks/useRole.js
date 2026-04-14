import { useAuth } from './useAuth';
import { ROLES } from '../utils/constants';

export function useRole() {
  const { user } = useAuth();

  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  const isAdmin = () => user?.role === ROLES.ADMIN;
  const isContentManager = () => user?.role === ROLES.CONTENT_MANAGER;
  const isTaxiManager = () => user?.role === ROLES.TAXI_MANAGER;
  const isCDManager = () => user?.role === ROLES.CD_MANAGER;

  return {
    hasRole,
    isAdmin,
    isContentManager,
    isTaxiManager,
    isCDManager,
  };
}