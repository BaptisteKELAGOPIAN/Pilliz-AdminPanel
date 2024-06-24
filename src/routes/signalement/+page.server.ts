import { URL_DEV } from '$env/static/private';
import type { Signalement } from "./signalement.dto";
import { error } from '@sveltejs/kit';

const url = URL_DEV;
const allSignalement = "/Signalement/getAllSignalements";

export const _getPostFromDatabase = async () => {
    const response = await fetch(`${url}${allSignalement}`);
    if (!response.ok) {
        throw new Error("Error while fetching Signalements");
    }
    const Signalements : Signalement[] = await response.json();
    return { Signalements } ;
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const post = await _getPostFromDatabase();

	if (post) {
		return { signalements: post.Signalements } ;
	}

	error(404, 'Not found');
}