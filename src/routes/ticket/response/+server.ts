import { json } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';
import type { TicketResponse } from '../ticket.dto';
import fetcher from '$lib/server/fetch';
import getToken from '$lib/server/fetch';
import type { RequestHandler } from '@sveltejs/kit';

const serv_url = URL_DEV;
const ticketById = "/Ticket/getALlResponsesByTicketId";

export async function GET({url, cookies}) {
    const idTicket = url.searchParams.get('idTicket');

    if (!idTicket) {
      return json({ message: "IdTicket is required" });
    }

    const response = await fetcher({url, cookies}, `${serv_url}${ticketById}/${idTicket}`);

    if (response.status !== 200 && response.status !== 404) {
      throw new Error("Error while fetching tickets");
    }
  
    const reponseTicket: TicketResponse[] = await response.json();

    return json(reponseTicket);
  }
