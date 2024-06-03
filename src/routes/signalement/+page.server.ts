import { signalements } from './data';
import { error } from '@sveltejs/kit';


export const _getPostFromDatabase = async () => {
    return signalements
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const post = await _getPostFromDatabase();

	if (post) {
		return { post } ;
	}

	error(404, 'Not found');
}