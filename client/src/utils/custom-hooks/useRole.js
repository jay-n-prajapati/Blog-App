import { useSelector } from 'react-redux';

const useRole = () => {
  const { user, admin, subAdmin } = useSelector((state) => state.auth);

  return user
    ? { currentUser: user, role: 'user', endPoint: 'users' }
    : admin
    ? { currentUser: admin, role: 'admin', endPoint: 'admin' }
    : subAdmin
    ? { currentUser: subAdmin, role: 'subAdmin', endPoint: 'subAdmins' }
    : { currentUser: '', role: '', endPoint: '' };
};

export default useRole;
