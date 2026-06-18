import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: [
    // Protect all admin dashboards and views
    '/admin/:path*',
    // Protect secure admin CRUD APIs
    '/api/admin/:path*',
  ],
};
