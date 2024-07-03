import { json } from '@sveltejs/kit';
import { URL_DEV } from '$env/static/private';

const serv_url = URL_DEV;
const allSignalement = "/Signalement/getAllUserSignalements";

export async function GET(request : any) {
    const url = new URL(request.url);
    const idUser = url.searchParams.get('idUser');
    if (!idUser) {
      return json({ message: "IdUser is required" });
    }
    try {
        const response = await fetch(`${serv_url}${allSignalement}/${idUser}`);
        if (response.status !== 200 && response.status !== 404) {
            throw new Error("Error while fetching user data");
        }
        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error(error);
        return json({ message: "Error while getting user data" });
    }
  }
