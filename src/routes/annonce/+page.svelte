<script lang="ts">
import { Paginator } from '@skeletonlabs/skeleton';
import type { Announcement } from './annonce.dto';
import { faBullhorn, faCircleInfo, faGauge, faTicket, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import Fa from 'svelte-fa'
import type { SvelteComponent } from 'svelte';
import { invalidateAll } from '$app/navigation';

export let data: { announcements : Announcement[] };


let paginationSettings = {
	page: 0,
	limit: 5,
	size: data.announcements.length,
	amounts: [1,2,5,10],
}

function sortAnnouncements(announcements: Announcement[]): Announcement[] {
    return announcements.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

$: sortedAnnouncements = sortAnnouncements(data.announcements);

$: paginatedSource = sortedAnnouncements.slice(
	paginationSettings.page * paginationSettings.limit,
	paginationSettings.page * paginationSettings.limit + paginationSettings.limit
);

let formData = {
    category: '',
    title: '',
    content: ''
};

async function onFormSubmit(): Promise<void> {
    const formEncodedData = new URLSearchParams();

    formEncodedData.append('category', formData.category);
    formEncodedData.append('title', formData.title);
    formEncodedData.append('content', formData.content);
    
    const res = await fetch(`annonce/post`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formEncodedData.toString()
        }
    );

    await res.json();
    if (res.ok) {
        await invalidateAll();
        paginationSettings.size = data.announcements.length;
    }

    formData = {
        category: '',
        title: '',
        content: ''
    }

}

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

function colorBubble(category: string): string {
    if(category == 'bonPlan') {
        return 'border-green-900 bg-green-500 bg-opacity-20';
    } if (category == 'alerte'){
        return 'border-red-900 bg-red-500 bg-opacity-20';
    } if (category == 'info'){
        return 'border-yellow-900 bg-yellow-500 bg-opacity-20';
    }
    return '';
}

</script>

<div class="m-6" >
	<div class ="flex justify-between my-6" >
		<div class="card flex-col flex w-[calc(45%-8px)] justify-center h-96">
            <form class="modal-form p-4">
                <label class="label">
                    <span>Type d'annonce</span>
                    <select class="select" bind:value={formData.category}>
                        <option value='alerte'>Alerte</option>
                        <option value='bonPlan'>Bon plan</option>
                        <option value='info'>Information</option>
                    </select>
                </label>
                <label class="label">
                    <span>Titre</span>
                    <textarea class="textarea" rows="1" placeholder="Ecrire votre titre ici." bind:value={formData.title}/>
                </label>
                <label class="label">
                    <span>Contenue</span>
                    <textarea class="textarea" rows="4" placeholder="Ecrire votre réponse ici." bind:value={formData.content}/>
                </label>
            </form>
            <footer class="footer flex justify-end pr-4">
                <button type="button" class="btn variant-filled py" on:click={onFormSubmit}>Publier</button>
            </footer>
        </div>
		<div class="flex w-[calc(55%-8px)] justify-center flex-col">
            <div class="card flex flex-1 flex-col items-center h-1/4 py-8">
                <div class ="items-start">
                <Paginator
                bind:settings={paginationSettings}
                showFirstLastButtons="{false}"
                showPreviousNextButtons="{true}"
            />
                </div>
                <ul class="w-10/12 max-w-md">
                    {#each paginatedSource as bubble}
                    <div class="justify-stretch gap-2 py-2">
                        <div class="pb-4 px-4 pt-2 rounded-tl-none space-y-2 rounded-lg border-4 {colorBubble(bubble.category.toString())}">
                            <header class="flex justify-between items-center">
                                <div class="flex justify-between items-center">
                                {#if bubble.category.toString() == 'bonPlan'}
                                    <Fa size="1x" icon={faBullhorn}/>
                                {/if}
                                {#if bubble.category.toString() == 'alerte'}
                                    <Fa size="1x" icon={faTriangleExclamation}/>
                                {/if}
                                {#if bubble.category.toString() == 'info'}
                                    <Fa size="1x" icon={faCircleInfo}/>
                                {/if}
                                &nbsp;
                                <p class="font-bold">{bubble.title}</p>
                                </div>
                                <small class="opacity-50">{formatDate(bubble.updatedAt)}</small>
                            </header>
                            <p class="text-sm">{bubble.content}</p>
                        </div>
                    </div>
                    {/each}
                </ul>

            </div>
        </div>
	</div>
</div>