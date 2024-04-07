import { useSelector } from 'react-redux';

const useRole = () => {
  const { isAuth, user, admin, subAdmin } = useSelector((state) => state.auth);
  return user
    ? { isAuth, currentUser: user, role: 'user', endPoint: 'users' }
    : admin
    ? { isAuth, currentUser: admin, role: 'admin', endPoint: 'admin' }
    : subAdmin
    ? { isAuth, currentUser: subAdmin, role: 'subAdmin', endPoint: 'subAdmins' }
    : { isAuth, currentUser: '', role: '', endPoint: '' };
};

export default useRole;
