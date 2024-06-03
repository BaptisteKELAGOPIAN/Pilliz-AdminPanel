<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { Ticket } from './ticket.dto';

	export let parent: SvelteComponent;
    export let data: Ticket;

	const modalStore = getModalStore();

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

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
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
                    <small class="opacity-100 text-lg">{$modalStore[0].body ? formatDate($modalStore[0].body) : '(body missing)'}</small>
                </header>
                <p class="opacity-500 text-2xl">{data.description}</p>
            </div>
        </div>
        <form class="modal-form {cForm}">
            <label class="label">
                <span>Status</span>
                <select class="select">
                    <option value="1">En cours</option>
                    <option value="2">Résolue</option>
                </select>
            </label>
            <label class="label">
                <span>Réponse</span>
                <textarea class="textarea" rows="4" placeholder="Ecrire votre réponse ici." />
            </label>
		</form>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Update</button>
		</footer>
	</div>
{/if}