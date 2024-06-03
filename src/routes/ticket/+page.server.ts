import type { Ticket } from "./ticket.dto";
import { error } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';

const url = URL_DEV;
const allTicket = "/Ticket/getAllTickets";

export const _getPostFromDatabase = async () => {
    const response = await fetch(`${url}${allTicket}`);
    if (!response.ok) {
        throw new Error("Error while fetching tickets");
    }
    const tickets : Ticket[] = await response.json();
    return { tickets } ;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    console.log("load request");
	const post = await _getPostFromDatabase();

	if (post) {
		return post ;
	}

	error(404, 'Not found');
}