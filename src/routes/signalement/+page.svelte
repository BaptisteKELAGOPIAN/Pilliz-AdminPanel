<script lang="ts">
    import Datatable from './datatable.svelte';
	import type { Signalement } from "./signalement.dto";
	import {  initializeStores, getModalStore, Modal } from '@skeletonlabs/skeleton';
	import ModalSignalement from './modalSignalement.svelte';
	import type { ModalComponent, ModalSettings} from '@skeletonlabs/skeleton';

    export let data: { signalements: Signalement[] };

	console.log(data);

    initializeStores();
	const modalStore = getModalStore();

	async function handleRowClick(row: any) {
		const modalComponent: ModalComponent = { ref: ModalSignalement,
		};
		const modal: ModalSettings = {
			type: 'component',
			title: row.titre,
			body: row.description,
			component: modalComponent,
		};
		modalStore.trigger(modal);
	}

</script>

<Modal />
<div class="py-5 px-5">
	<div  class="card py-5 px-5">
	<Datatable datatable={data.signalements} onRowClick={handleRowClick}/>
	</div>
</div>
