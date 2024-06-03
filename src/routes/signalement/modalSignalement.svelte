<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	// import type { Ticket, TicketResponse } from './ticket.dto';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(FormData);
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
        <div class="grid grid-cols-[auto_1fr] gap-2">
            <div class="card p-4 variant-soft rounded-tl-none space-y-2">
                <header class="flex justify-between items-center">
					<p class="opacity-500 text-2xl">{$modalStore[0].title}</p>
                </header>
				<p class="opacity-500 text-1xl">{$modalStore[0].body}</p>
            </div>
        </div>
        <form class="modal-form {cForm}">
            <label class="label">
                <span>Status</span><br>
                <select class="select w-32">
                    <option value="1">En cours</option>
                    <option value="2">Résolue</option>
                </select>
            </label>
			<br>
			<span>Banissement</span>
			<div class="flex flex-row ">
				<label class="label w-18 pe-4">
					<select class="select">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="2">3</option>
						<option value="2">5</option>
						<option value="2">10</option>
						<option value="2">15</option>
						<option value="2">20</option>
						<option value="2">30</option>
					</select>
				</label>
				<label class="label w-25 pe-4">
					<select class="select">
						<option value="1">Jours</option>
						<option value="2">Mois</option>
						<option value="2">Année</option>
					</select>
				</label>
				<button type="button" class="btn bg-red-600">
					<!-- <span>(icon)</span> -->
					<span>Bannir</span>
				</button>
			</div>
		</form>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Update</button>
		</footer>
	</div>
{/if}