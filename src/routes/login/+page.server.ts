import { redirect, fail } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';

const base_url = URL_DEV;


function verifyAdmin(access_token: string) {
    const url = base_url + '/auth/userAuthInfo';

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.isAdmin) {
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return false;
    });
}


export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const email = data.get('email');
        const userid = data.get('userid');
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
            body: data_send.toString()
        });

        const data_response = await response.json();

        if (response.status != 200) {
            return fail(response.status, {message: data_response.message});
        }

        const access_token = data_response["accessToken"];

        const cookiesDuration = 60 * 60 * 24 * 1000;

        cookies.set('isLoggedIn', "true", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: cookiesDuration
        });

        cookies.set('access_token', access_token, {
            path : '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: cookiesDuration
        });

        const isAdmin = await verifyAdmin(access_token);

        if (isAdmin) {
            return redirect(302, '/dashboard');
        } else {
            return fail(403, {message: 'You are not an admin'});
        }
    }
};