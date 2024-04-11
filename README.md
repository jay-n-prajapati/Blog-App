
# Blogify

Blogify is a blog application that caters to three types of users: Admin, Subadmin, and User. Each user type has specific capabilities on the basis of their role, offering a comprehensive and efficient blogging experience.


## Setup



```bash
git clone https://github.com/jay-n-prajapati/Blog-App.git
```
#### Client Setup :
```bash
cd client
npm install

to start : npm run dev
```
#### Server Setup :
```bash
cd server
npm install

to start : npm run start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`VITE_DB_URL = http://localhost:3000`

`VITE_CLOUDINARY_NAME = your cloudinary name`

`VITE_CLOUDINARY_PRESET = cloudinary preset name`


## Features

User
- Create: Users can create new blog posts.
- Read: Users can view and read existing blog posts.
- Delete: Users can delete their own blog posts.
- user can save the blogs to read later.
SubAdmin
- Create: Subadmins can create new blog posts.
- Read: Subadmins can view and read existing blog posts.
- Delete: Subadmins can delete their own blog posts and those created by Users.

Admin
- Create: Admins can create new blog posts and also new subadmins.
- Read: Admins can view and read all existing blog posts and user details.
- Delete: Admins can delete any blog post, user, and subadmin.

## Additional Features

Admin-Specific Features

- Manage blogs: Admin can delete all the blogs.
- Manage Subadmins: Admin can create, read, update, and delete (CRUD) subadmin accounts.
- Assign Categories: Admin can assign specific blog categories to subadmins.
- Manage Categories: Admin can create, read, update, and delete (CRUD) blog categories.

Subadmin-Specific Features

- Manage blogs: Subadmins can delete blogs of user with assigned category.
- Manage SubCategories: Subadmins can create, read, update, and delete (CRUD) blog subcategories for specific category assigned to him.

