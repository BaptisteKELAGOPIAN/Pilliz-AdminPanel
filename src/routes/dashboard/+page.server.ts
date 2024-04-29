import { error } from '@sveltejs/kit';
import type { Metrics } from "./metric.dto";

export const _getPostFromDatabase = async () => {
    const metricW0 : Metrics = {
        date: new Date('2024-04-22'),
        numberOfUsers: 450,
        numberOfPosts: 9000,
        numberOfLikes: 18000,
        numberOfReposts: 900,
        numberOfComments: 1800,
        numberOfReplies: 900,
        weeklyNumberOfUsers: 50,
        weeklyNumberOfPosts: 1000,
        weeklyNumberOfLikes: 2000,
        weeklyNumberOfReposts: 100,
        weeklyNumberOfComments: 200,
        weeklyNumberOfReplies: 100
    }
    const metricW1: Metrics = {
        date: new Date('2024-04-15'),
        numberOfUsers: 400,
        numberOfPosts: 8000,
        numberOfLikes: 16000,
        numberOfReposts: 800,
        numberOfComments: 1600,
        numberOfReplies: 800,
        weeklyNumberOfUsers: 50,
        weeklyNumberOfPosts: 1000,
        weeklyNumberOfLikes: 2000,
        weeklyNumberOfReposts: 100,
        weeklyNumberOfComments: 200,
        weeklyNumberOfReplies: 100
    }
    const metricW2: Metrics = {
        date: new Date('2024-04-08'),
        numberOfUsers: 350,
        numberOfPosts: 7000,
        numberOfLikes: 14000,
        numberOfReposts: 700,
        numberOfComments: 1400,
        numberOfReplies: 700,
        weeklyNumberOfUsers: 50,
        weeklyNumberOfPosts: 1000,
        weeklyNumberOfLikes: 2000,
        weeklyNumberOfReposts: 100,
        weeklyNumberOfComments: 200,
        weeklyNumberOfReplies: 100
    }
    const metricW3: Metrics = {
        date: new Date('2024-04-01'),
        numberOfUsers: 300,
        numberOfPosts: 6000,
        numberOfLikes: 12000,
        numberOfReposts: 600,
        numberOfComments: 1200,
        numberOfReplies: 600,
        weeklyNumberOfUsers: 50,
        weeklyNumberOfPosts: 1000,
        weeklyNumberOfLikes: 2000,
        weeklyNumberOfReposts: 100,
        weeklyNumberOfComments: 200,
        weeklyNumberOfReplies: 100
    } 

    return {metricW0, metricW1, metricW2, metricW3};
};
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const post = await _getPostFromDatabase();

	if (post) {
		return post ;
	}

	error(404, 'Not found');
}
  