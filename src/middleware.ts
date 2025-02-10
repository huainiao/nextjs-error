import { auth } from '@/auth';

export const middleware = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const auth = req.auth;
  const loginUrl = new URL('/login', req.nextUrl.origin);
  if (!auth && pathname === '/') {
    return Response.redirect(loginUrl);
  }
  // dashboard 下的页面需要登录
  if (!auth && (pathname.startsWith('/dashboard') || pathname.startsWith('/manage'))) {
    return Response.redirect(loginUrl);
  }
});

export const config = {
  runtime: 'nodejs',
};
