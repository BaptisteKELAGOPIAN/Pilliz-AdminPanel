import type { Announcement } from './annonce.dto';
import { error } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';
import fetcher from '$lib/server/fetch';

const url = URL_DEV;
const allTicket = "/announcement/getAllAnnouncements";

export const _getPostFromDatabase = async (event: Event) => {
    const response = await fetcher(event, `${url}${allTicket}`);
    if (!response.ok) {
        throw new Error("Error while fetching tickets");
    }
    const announcements : Announcement[] = await response.json();
    return { announcements } ;
};

/** @type {import('./$types').PageServerLoad} */
export async function load(event: Event): (Promise<{ announcements: Announcement[]; }>) {
	const post = await _getPostFromDatabase(event);

	if (post) {
		return post ;
	}

	error(404, 'Not found');
}