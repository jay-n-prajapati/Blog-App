import { getUser, updateUser } from '../axios-instance';
import { toast } from 'react-toastify';

export const removeFromSavedBlogs = async (blog) => {
  for (const userId of blog.savedBy) {
    const { success: getSuccess, data: userData, error: userErr } = await getUser(userId);
    if (!getSuccess) {
      toast.error(`Error : ${userErr}`);
      return;
    }
    const filteredSavedBlogs = userData.savedBlogs.filter((blogId) => blogId !== blog.id);
    try {
      // issue may be occur here
      await updateUser(userId, 'users', {
        savedBlogs: filteredSavedBlogs,
      });
    } catch ({error}) {
      toast.error(`Error : ${error}`);
    }
  }
};
