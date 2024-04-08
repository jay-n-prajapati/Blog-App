import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserDetails from './UserDetails';
import SubAdminDetails from './SubAdminDetails';
import CategoryDetails from './CategoryDetails';
import BlogDetails from '../BlogDetails';

const tabs = [
  { label: 'Users', value: 'users' },
  { label: 'Sub Admins', value: 'subAdmins' },
  { label: 'Blogs', value: 'blogs' },
  { label: 'Categories', value: 'categories' },
];

const AdminDashBoard = () => {
  return (
    <div className='p-4 sm:p-6'>
      <div>
        <Tabs defaultValue='users' className='mx-auto'>
          <div className='flex justify-center sm:justify-between  items-center'>
            <div className='hidden sm:block'>
              <h1 className='text-3xl font-bold'>Welcome Admin!</h1>
            </div>
            <div>
              <TabsList className='max-w-fit border border-[#b2b2b2]'>
                {tabs.map((tab, idx) => {
                  return (
                    <TabsTrigger value={tab.value} key={idx} className='text-xs sm:text-sm'>
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>
          <div>
            <TabsContent value='users'>
              <UserDetails />
            </TabsContent>
            <TabsContent value='subAdmins'>
              <SubAdminDetails />
            </TabsContent>
            <TabsContent value='blogs'>
              <BlogDetails />
            </TabsContent>
            <TabsContent value='categories'>
              <CategoryDetails />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashBoard;
