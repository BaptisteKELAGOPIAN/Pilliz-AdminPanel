import { redirect, fail } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';
import crypto from 'crypto';

const base_url = URL_DEV;

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password') ?? '';

        if (!email) {
            return fail(400, { email, missing: true });
        }
        if (!password) {
            return fail(400, { password, missing: true });
        }

        const url = base_url + '/auth/login';
        const data_send = new URLSearchParams();
        data_send.append('email', email);
        data_send.append('password', password);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data_send
        });

        const data_response = await response.json();

        if (data_response.statusCode) {
            return fail(data_response.statusCode, {message: data_response.message});
        }

        if (data_response.isAdmin === false) {
            return fail(403, {message: 'You are not an admin'});
        }
        cookies.set('isLoggedIn', "true", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 1000
        });
        redirect(302, '/dashboard');
    }
};