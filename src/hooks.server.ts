import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    const isLoggedIn = event.cookies.get('isLoggedIn');
    const currentPath = event.url.pathname;

    if (currentPath !== '/login' && (!isLoggedIn || isLoggedIn !== 'true')) {
        return redirect(302, '/login');
    }

    const response = await resolve(event);
    return response;
}
