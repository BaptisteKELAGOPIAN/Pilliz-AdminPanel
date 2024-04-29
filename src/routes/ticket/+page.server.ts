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
	const post = await _getPostFromDatabase();

	if (post) {
		return post ;
	}

	error(404, 'Not found');
}




































// export const _getTickets = async () : Promise<Ticket[]> => {
//     const response = await fetch(`${url}${allTicket}`);
//     if (!response.ok) {
//         throw new Error("Error while fetching tickets");
//     }
//     const tickets = await response.json();
//     return tickets;
// };

// export async function load () {
//     try {
//         const tickets = await _getTickets();
//         return {
//             status: 200,
//             body: {
//                 tickets
//             }
//         };
//     } catch (e) {
//         return {
//             status: 500,
//             body: {
//                 error: "Error while fetching tickets"
//             }
//         };
//     }
// }