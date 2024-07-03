import { json } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';

const serv_url = URL_DEV;
const changeTicketStatus = "/Ticket/changeTicketStatus";

export async function POST(request) {
    try {
    const url = new URL(request.url);
    const idTicket = url.searchParams.get('idTicket');
      const response = await fetch(`${serv_url}${changeTicketStatus}/${idTicket}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Error while changing ticket status");
      }
  
      return json({ message: "Ticket status changed successfully" });
    } catch (error) {
      console.error(error);
      return json({ message: "Error while changing ticket status" });
    }
  }
