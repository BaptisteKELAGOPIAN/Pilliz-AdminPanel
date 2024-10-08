import { json } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';
import fetcher from '$lib/server/fetch';

const serv_url = URL_DEV;
const posteAnnonce = "/announcement/createAnnouncement";

export async function POST({request, cookies}) {
    try {
        const requestDataText = await request.text();
        const requestDataParams = new URLSearchParams(requestDataText);
        
        const requestData = {
            category: requestDataParams.get('category'),
            title: requestDataParams.get('title'),
            content : requestDataParams.get('content')
        };
        if (!requestData.category) {
            throw new Error("Category is required");
        }

        if(!requestData.title) {
            throw new Error("Title is required");
        }

        if(!requestData.content) {
            throw new Error("Content is required");
        }

        const formData = new URLSearchParams();
        formData.append('category', requestData.category);
        formData.append('title', requestData.title) ;
        formData.append('content', requestData.content) ;

        const response = await fetcher({request, cookies}, `${serv_url}${posteAnnonce}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error while adding response");
        }

        return json({ message: "Ticket status changed successfully" });
    } catch (error) {
        return json({ message: "Error while adding response" }, { status: 400 });
    }
}
