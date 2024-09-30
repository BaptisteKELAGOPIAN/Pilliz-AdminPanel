import type { Announcement } from './annonce.dto';
import { error } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';

const url = URL_DEV;
const allTicket = "/announcement/getAllAnnouncements";

export const _getPostFromDatabase = async () => {
    const response = await fetch(`${url}${allTicket}`);
    if (!response.ok) {
        throw new Error("Error while fetching tickets");
    }
    const announcements : Announcement[] = await response.json();
    return { announcements } ;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const post = await _getPostFromDatabase();

	if (post) {
		return post ;
	}

	error(404, 'Not found');
}