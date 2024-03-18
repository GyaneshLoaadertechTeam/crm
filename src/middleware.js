// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === '/login';
//   const token = request.cookies.get("token")?.value || "";

//   // Debugging with console.log
//   console.log(`Accessing Path: ${path}`);
//   console.log(`Is Public Path: ${isPublicPath}`);
//   console.log(`Token: ${token}`);

//   // Debugging: Modify response headers to indicate middleware logic paths
//   let debugResponse = NextResponse.next();
//   debugResponse.headers.set('X-Debug-Path', `Accessing: ${path}`);
//   debugResponse.headers.set('X-Debug-Token', `Token: ${token}`);

//   if (isPublicPath && token) {
//     debugResponse = NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//     debugResponse.headers.set('X-Debug-Action', 'Redirected to dashboard due to login path with token');
//     return debugResponse;
//   }

//   if (!isPublicPath && !token) {
//     debugResponse = NextResponse.redirect(new URL("/login", request.nextUrl));
//     debugResponse.headers.set('X-Debug-Action', 'Redirected to login due to protected path without token');
//     return debugResponse;
//   }

//   // Setting a default debug action if none of the above conditions are met
//   debugResponse.headers.set('X-Debug-Action', 'No action taken');
//   return debugResponse;
// }

// export const config = {
//   matcher: ['/', '/login', '/dashboard', '/lead'],
// };


// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   const path = request.nextUrl.pathname;
  
//   const isPublicPath = path === '/login';
//   const token = request.cookies.get("token")?.value || "";

//   console.log(isPublicPath, token);

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL(`${path}`, request.nextUrl));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/', '/login', '/dashboard', '/lead'],
// }


















import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone(); // Clone the URL for modifications
    const path = request.nextUrl.pathname;
  
    // Define `/login` as the public path
    const isPublicPath = path === '/login';
    // Paths that require authentication
    const requiresAuthPaths = ['/dashboard', '/lead'];

    // Retrieve the token from cookies
    const token = request.cookies.get("token");

    // Redirect logged-in users trying to access the login page to the dashboard
    if (isPublicPath && token) {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    // For paths that require authentication and no token is found, redirect to the login page
    if (requiresAuthPaths.includes(path) && !token) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Allow the request to proceed if none of the above conditions are met
    return NextResponse.next();
}

// Configure the middleware to run on specific paths, including your authenticated paths
export const config = {
    matcher: ['/', '/login', '/dashboard', '/lead', '/:path*'],
};
