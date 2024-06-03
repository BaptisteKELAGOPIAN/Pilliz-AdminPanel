<script lang="ts">
	import ThSort from '$lib/tab/ThSort.svelte';
	import Search from '$lib/tab/Search.svelte';
	import RowsPerPage from '$lib/tab/RowsPerPage.svelte';
	import RowCount from '$lib/tab/RowCount.svelte';
	import Pagination from '$lib/tab/Pagination.svelte';

	import type { Ticket } from "./ticket.dto";

	export let datatable : Ticket[];

	export let onRowClick: (ticket: Ticket) => void;

	import { DataHandler } from '@vincjo/datatables';

	const handler = new DataHandler(datatable, { rowsPerPage: 5 });
	const rows = handler.getRows();

	function formatDate(date: Date): string {
		const dateString = new Date(date).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		});
		return dateString;
	}
</script>

<div class=" overflow-x-auto space-y-4">
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="email">Email</ThSort>
				<ThSort {handler} orderBy="category">Categorie</ThSort>
				<ThSort {handler} orderBy="description">Description</ThSort>
				<ThSort {handler} orderBy="createdAt">Crée le</ThSort>
				<ThSort {handler} orderBy="solved">Resolu</ThSort>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr on:click={() => onRowClick(row)} class="cursor-pointer">
					<td>{row.email}</td>
					<td>{row.category}</td>
					<td>{row.description.length > 10 ? row.description.substring(0, 10) + '...' : row.description}</td>
					<td>{formatDate(row.createdAt)}</td>
					<td>
						<span class="chip {row.solved ? 'variant-filled-success' : 'variant-filled-warning'}">
						  {row.solved ? 'Résolue' : 'En cours'}
						</span>
					  </td>					  
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
