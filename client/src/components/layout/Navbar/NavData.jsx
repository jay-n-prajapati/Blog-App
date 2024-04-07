export const links = [
  {
    label: 'Write',
    slug: '/write',
    icon: (
      <svg width='24' height='24' viewBox='0 0 22 22' fill='none' aria-label='Write'>
        <path
          d='M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z'
          fill='currentColor'
        ></path>
        <path
          d='M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2'
          stroke='currentColor'
        ></path>
      </svg>
    ),
  },
];

export const DropDownLinks = {
  user: [
    {
      label: 'Home',
      slug: '/home',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-home'
        >
          <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
      ),
    },
    {
      label: 'Profile',
      slug: '/profile',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Profile'>
          <circle cx='12' cy='7' r='4.5' stroke='currentColor'></circle>
          <path
            d='M3.5 21.5v-4.34C3.5 15.4 7.3 14 12 14s8.5 1.41 8.5 3.16v4.34'
            stroke='currentColor'
          ></path>
        </svg>
      ),
    },
    {
      label: 'Library',
      slug: '/library',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Lists'>
          <path
            d='M6.44 6.69h0a1.5 1.5 0 0 1 1.06-.44h9c.4 0 .78.16 1.06.44l.35-.35-.35.35c.28.28.44.66.44 1.06v14l-5.7-4.4-.3-.23-.3.23-5.7 4.4v-14c0-.4.16-.78.44-1.06z'
            stroke='currentColor'
          ></path>
          <path d='M12.5 2.75h-8a2 2 0 0 0-2 2v11.5' stroke='currentColor'></path>
        </svg>
      ),
    },
    {
      label: 'Stories',
      slug: '/stories',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Stories'>
          <path
            d='M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z'
            stroke='currentColor'
          ></path>
          <path d='M8 8.5h8M8 15.5h5M8 12h8' stroke='currentColor'></path>
        </svg>
      ),
    },
  ],
  admin: [
    {
      label: 'Home',
      slug: '/home',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-home'
        >
          <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
      ),
    },
    {
      label: 'Profile',
      slug: '/profile',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Profile'>
          <circle cx='12' cy='7' r='4.5' stroke='currentColor'></circle>
          <path
            d='M3.5 21.5v-4.34C3.5 15.4 7.3 14 12 14s8.5 1.41 8.5 3.16v4.34'
            stroke='currentColor'
          ></path>
        </svg>
      ),
    },
    {
      label: 'Library',
      slug: '/library',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Lists'>
          <path
            d='M6.44 6.69h0a1.5 1.5 0 0 1 1.06-.44h9c.4 0 .78.16 1.06.44l.35-.35-.35.35c.28.28.44.66.44 1.06v14l-5.7-4.4-.3-.23-.3.23-5.7 4.4v-14c0-.4.16-.78.44-1.06z'
            stroke='currentColor'
          ></path>
          <path d='M12.5 2.75h-8a2 2 0 0 0-2 2v11.5' stroke='currentColor'></path>
        </svg>
      ),
    },
    {
      label: 'Stories',
      slug: '/stories',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Stories'>
          <path
            d='M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z'
            stroke='currentColor'
          ></path>
          <path d='M8 8.5h8M8 15.5h5M8 12h8' stroke='currentColor'></path>
        </svg>
      ),
    },
    {
      label: 'Dashboard',
      slug: '/adminDashboard',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-layout-dashboard'
        >
          <rect width='7' height='9' x='3' y='3' rx='1' />
          <rect width='7' height='5' x='14' y='3' rx='1' />
          <rect width='7' height='9' x='14' y='12' rx='1' />
          <rect width='7' height='5' x='3' y='16' rx='1' />
        </svg>
      ),
    },
  ],
  subAdmin: [
    {
      label: 'Home',
      slug: '/home',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-home'
        >
          <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
      ),
    },
    {
      label: 'Profile',
      slug: '/profile',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Profile'>
          <circle cx='12' cy='7' r='4.5' stroke='currentColor'></circle>
          <path
            d='M3.5 21.5v-4.34C3.5 15.4 7.3 14 12 14s8.5 1.41 8.5 3.16v4.34'
            stroke='currentColor'
          ></path>
        </svg>
      ),
    },
    {
      label: 'Library',
      slug: '/library',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Lists'>
          <path
            d='M6.44 6.69h0a1.5 1.5 0 0 1 1.06-.44h9c.4 0 .78.16 1.06.44l.35-.35-.35.35c.28.28.44.66.44 1.06v14l-5.7-4.4-.3-.23-.3.23-5.7 4.4v-14c0-.4.16-.78.44-1.06z'
            stroke='currentColor'
          ></path>
          <path d='M12.5 2.75h-8a2 2 0 0 0-2 2v11.5' stroke='currentColor'></path>
        </svg>
      ),
    },
    {
      label: 'Stories',
      slug: '/stories',
      icon: (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-label='Stories'>
          <path
            d='M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z'
            stroke='currentColor'
          ></path>
          <path d='M8 8.5h8M8 15.5h5M8 12h8' stroke='currentColor'></path>
        </svg>
      ),
    },
    {
      label: 'Dashboard',
      slug: '/subAdminDashboard',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-layout-dashboard'
        >
          <rect width='7' height='9' x='3' y='3' rx='1' />
          <rect width='7' height='5' x='14' y='3' rx='1' />
          <rect width='7' height='9' x='14' y='12' rx='1' />
          <rect width='7' height='5' x='3' y='16' rx='1' />
        </svg>
      ),
    },
  ],
};
