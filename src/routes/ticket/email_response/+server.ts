import { json } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';

const serv_url = URL_DEV;
const addResponse = "/Ticket/addResponse";

export async function POST({request}) {
    console.log("POST request");
    try {
        const requestDataText = await request.text();
        const requestDataParams = new URLSearchParams(requestDataText);
        
        const requestData = {
            idTicket: requestDataParams.get('idTicket'),
            response: requestDataParams.get('response')
        };
        if (!requestData.idTicket || !requestData.response) {
            return json({ message: "IdTicket and response are required" });
        }
        const formData = new URLSearchParams();
        formData.append('ticketId', requestData.idTicket);
        formData.append('response', requestData.response) ;

        const response = await fetch(`${serv_url}${addResponse}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        console.log(response);
        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Error while adding response");
        }

        return json({ message: "Ticket status changed successfully" });
    } catch (error) {
        console.error(error);
        return json({ message: "Error while changing ticket status" });
    }
}
