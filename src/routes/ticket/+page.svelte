<script lang="ts">
	import DatatableClient from '$lib/tab/Datatable.svelte';
	import type { Ticket } from "./ticket.dto";
	import {  initializeStores, getModalStore, Modal } from '@skeletonlabs/skeleton';
	import ModalTicket from './modalTicket.svelte';
	import type { ModalComponent, ModalSettings} from '@skeletonlabs/skeleton';

	export let data: { tickets: Ticket[] };

	initializeStores();
	const modalStore = getModalStore();

	function handleRowClick(ticket: Ticket) {
		const modalComponent: ModalComponent = { ref: ModalTicket,
			props: {
				data: ticket
			}
		};
		const modal: ModalSettings = {
			type: 'component',
			title: ticket.category.toString(),
			body: ticket.createdAt.toString(),
			component: modalComponent,
		};
		modalStore.trigger(modal);
	}
</script>

<Modal />
<div class="py-5 px-5">
	<div  class="card py-5 px-5">
	<DatatableClient datatable={data.tickets} onRowClick={handleRowClick}/>
	</div>
</div>