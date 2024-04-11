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

// upload image
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`,
    { method: 'POST', body: formData },
  );
  const data = await res.json();
  const url = data.url;
  return url;
};
