<script lang="ts">
	import { Table, Modal, initializeStores, getModalStore } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { Ticket } from "./ticket.dto";

	export let data: { tickets: Ticket[] };

	initializeStores();
	const modalStore = getModalStore();
	
	//     id: string;
    // email: string;
    // category: TicketCategory;
    // description: string;
    // createdAt: Date;
    // solved: boolean;
    // solvedAt?: Date;


	function styleResolver(value: boolean): string {
		if (value) {
			return "<span class='chip variant-filled-success'>Resolue</span>";
		}
		return "<span class='chip variant-filled-warning'>En cours</span>";
	}

	function dateToString(dateString: string): string {
	const date = new Date(dateString);
		return date.toLocaleString("fr-FR", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
		});
	}

	const mappedTickets = data.tickets.map((ticket: Ticket) => {
		return {
			email: ticket.email,
			category: ticket.category,
			description: ticket.description.substring(0, 19) + "...",
			createdAt: dateToString(ticket.createdAt.toString()),
			solved: styleResolver(ticket.solved),
		};
	});

	function setTableSource(): TableSource {
		return {
			head : ['email', 'categorie','Description', 'Crée le', 'Resolu'],
			body: tableMapperValues(mappedTickets , ['email', 'category','description', 'createdAt', 'solved']),
		};
	}

	$: tableTicket = setTableSource();

	function mySelectionHandler(event: CustomEvent) {
		console.log('Selected:', event.detail);
		// const modal: ModalSettings = {
		// 	type: 'alert',
		// 	title: event.detail[0],
		// 	body: event.detail[1],
		// };
		// modalStore.trigger(modal);
	}


</script>

<Modal />
<div class ="px-12 pt-12"><Table source={tableTicket} interactive={true} on:selected={mySelectionHandler}/></div>