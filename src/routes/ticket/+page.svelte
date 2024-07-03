<script lang="ts">
	import DatatableClient from './datatable.svelte';
	import type { Ticket, TicketResponse, FormData } from "./ticket.dto";
	import {  initializeStores, getModalStore, Modal } from '@skeletonlabs/skeleton';
	import ModalTicket from './modalTicket.svelte';
	import type { ModalComponent, ModalSettings} from '@skeletonlabs/skeleton';
	import { invalidateAll  } from '$app/navigation';

	export let data: { tickets: Ticket[] };

	initializeStores();
	const modalStore = getModalStore();

	async function fetchTicket(idTicket: string) {
		const res = await fetch(`ticket/response?idTicket=${encodeURIComponent(idTicket)}`);
		const data : TicketResponse[] = await res.json();
		return data;
	}

	async function handleResponseModal (formData : FormData, itWasSolved : boolean) {
		if(formData.status != (itWasSolved ? '2' : '1') ) {
			const res = await fetch(`ticket/status?idTicket=${encodeURIComponent(formData.id)}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
				}
			);
		}
		if(formData.text != '' ) {
			const idTicket = formData.id;
			const responseText = formData.text;

			const formEncodedData = new URLSearchParams();
			formEncodedData.append('idTicket', idTicket);
			formEncodedData.append('response', responseText);
			const res = await fetch(`ticket/email_response`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: formEncodedData.toString()
				}
			);
		}
		await invalidateAll();
	}

	async function handleRowClick(ticket: Ticket) {
		const ticketReponse = await fetchTicket(ticket.id);
		const data : {
			_ticket : Ticket,
			_ticketResponse : TicketResponse[]
		} = {
			_ticket : ticket,
			_ticketResponse: ticketReponse
		}
		const modalComponent: ModalComponent = { ref: ModalTicket,
			props: {
				data: data
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			title: ticket.category.toString(),
			body: ticket.createdAt.toString(),
			component: modalComponent,
			response : (formData : FormData) => {
				handleResponseModal(formData, ticket.solved);
			}
		};
		modalStore.trigger(modal);
	}
</script>

<Modal />
<div class="py-5 px-5">
	<div  class="card py-5 px-5">
	{#key data.tickets}
		<DatatableClient datatable={data.tickets} onRowClick={handleRowClick}/>
	{/key}
	</div>
</div>