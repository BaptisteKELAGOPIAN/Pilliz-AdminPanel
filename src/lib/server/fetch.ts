// src/lib/fetchWithAuth.ts
import type { RequestEvent } from '@sveltejs/kit';

async function fetcher(event, url: string, options: RequestInit = {}) {
    const accessToken = event.cookies.get('access_token');
    const headers = new Headers(options.headers || {});
    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const newOptions = {
        ...options,
        headers: headers
    };

    return fetch(url, newOptions);
}

export default fetcher;