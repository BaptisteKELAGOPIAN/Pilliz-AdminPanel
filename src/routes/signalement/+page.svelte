<script lang="ts">
    import Datatable from './datatable.svelte';
	import {  initializeStores, getModalStore, Modal } from '@skeletonlabs/skeleton';
	import ModalSignalement from './modalSignalement.svelte';
	import type { ModalComponent, ModalSettings} from '@skeletonlabs/skeleton';

    export let data: any ;

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

    function myfunc() {
        console.log(data.post);
    }
</script>

<Modal />
<div class="py-5 px-5">
	<div  class="card py-5 px-5">
	<Datatable datatable={data.post} onRowClick={handleRowClick}/>
	</div>
</div>
