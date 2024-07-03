<script lang="ts">
    import { Avatar, TabGroup, Tab, type ModalComponent, type ModalSettings, getModalStore, initializeStores } from '@skeletonlabs/skeleton';
   
    import type { User } from './user.dto';
    import type { PostDto } from './post/post.dto';
    import type { Signalement } from '../signalement/signalement.dto';
    
	  import { onMount } from 'svelte';

    import Datatable from '../signalement/datatable.svelte';
    import ModalSignalement from '../signalement/modalSignalement.svelte';
    import Post from './post/post.svelte';

    let tabSet: number = 0;
    const idUser = "6c2212ed-52de-4d77-b027-48d98c423dc9";

    let user : User | null = null;
    let loading = true;
    onMount(async () => {
      user = await getData();
      loading = false;
    });

    let posts : PostDto[] | null = null;
    let loadingMessage = true;
    async function getMessage() {
      const res = await fetch(`user/post?idUser=${idUser}`)
      const data : PostDto[] = await res.json();
      posts = data;
      loadingMessage = false;
    }

    let signalements : Signalement[] = [];
    let loadingSignalement = true;
    async function getSignalement() {
      const res = await fetch(`user/signalement?idUser=${idUser}`)
      const data : Signalement[] = await res.json();
      signalements = data;
      loadingSignalement = false;
    }
  
    async function getData() {
      const res = await fetch(`user/get_user?idUser=${idUser}`)
      const data : User = await res.json();
      return data;
    }

    
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
  
  <!-- button who called test -->
  {#if loading}
    <div>Loading...</div>
  {:else if user}
  <div class="flex w-full px-4" >
    <div class="card flex flex-col mt-6 p-4">
        <div class="relative inline-block flex justify-center">
            <!-- <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-30 dark:border-gray-900">20</div> -->
            <Avatar width="w-32"/>
        </div>
        <div class="flex gap-2 flex-col items-center pt-4 pb-10">
          <span class="font-extrabold "> {user.name}</span>
          {user.bio}
        </div>
        <div>
        <div class="flex gap-2 pb-4">
          <span class="font-extrabold ">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </span>
        </div>
        <div class="flex gap-2 flex-wrap items-center justify-center">
          Inscrit depuis: <span class="font-extrabold ">{user.createdAt}</span>
        </div>
      </div>
    </div>
    <div class="card flex mt-6 ml-5 p-4">
        <TabGroup justify="justify-center" class="flex flex-grow w-full flex-col">
            <div class="flex flex-row">
                <Tab bind:group={tabSet} name="tab2" value={0}><span class="font-extrabold ">Détail</span></Tab>
                <Tab bind:group={tabSet} name="tab2" value={1} on:click={getMessage}><span class="font-extrabold ">Post</span></Tab>
                <Tab bind:group={tabSet} name="tab3" value={2} on:click={getSignalement}><span class="font-extrabold ">Signalement</span></Tab>
            </div>
            <!-- Tab Panels --->
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                <div class="grid grid-cols-3 gap-20">
                  <div class="grid grid-cols-2 gap-1">
                      <div class="font-extrabold ">ID :</div>
                      <div>{user.id}</div>
                      <div class="font-extrabold ">Email :</div>
                      <div>{user.email}</div>
                      <div class="font-extrabold ">Nom :</div>
                      <div>{user.name}</div>
                      <div class="font-extrabold ">Rôle :</div>
                      <div>{user.role}</div>
                      <div class="font-extrabold ">Date de création :</div>
                      <div>{user.createdAt}</div>
                      <div class="font-extrabold ">Date de mise à jour :</div>
                      <div>{user.updatedAt}</div>
                  </div>
                  <div class="grid grid-cols-2 gap-1">
                      <div class="font-extrabold ">Première connexion :</div>
                      <div>{user.firstConnection ? 'Oui' : 'Non'}</div>
                      <div class="font-extrabold ">Tutoriel fil d'actualités :</div>
                      <div>{user.tutorialFeed ? 'Oui' : 'Non'}</div>
                      <div class="font-extrabold ">Tutoriel marché :</div>
                      <div>{user.tutorialMarketplace ? 'Oui' : 'Non'}</div>
                      <div class="font-extrabold ">Tutoriel pro :</div>
                      <div>{user.tutorialPro ? 'Oui' : 'Non'}</div>
                      <div class="font-extrabold ">Statut de bannissement :</div>
                      <div>{user.banned}</div>
                      <div class="font-extrabold ">Vérifié :</div>
                      <div>{user.isVerified ? 'Oui' : 'Non'}</div>
                      <div class="font-extrabold ">Pays :</div>
                      <div>{user.country}</div>
                  </div>
                  <div class="grid grid-cols-2 gap-1">
                      <div class="font-extrabold ">Temps total général :</div>
                      <div>{user.totalAppTime}</div>
                      <div class="font-extrabold ">Temps total main fil :</div>
                      <div>{user.totalFeedTime}</div>
                      <div class="font-extrabold ">Temps total market :</div>
                      <div>{user.totalMarketTime}</div>
                      <div class="font-extrabold ">Temps total pro :</div>
                      <div>{user.totalProTime}</div>
                      <div class="font-extrabold ">Version de l'appareil :</div>
                      <div>{user.deviceRelease}</div>
                      <div class="font-extrabold ">Nom de l'appareil :</div>
                      <div>{user.deviceName}</div>
                      <div class="font-extrabold ">Largeur de l'appareil :</div>
                      <div>{user.deviceWidth}</div>
                      <div class="font-extrabold ">Hauteur de l'appareil :</div>
                      <div>{user.deviceHeight}</div>
                  </div>
              </div>

                {:else if tabSet === 1}
                <div>
                    {#if loadingMessage}
                      loading...
                    {:else if posts != null}
                      <Post datapost={posts}/>
                    {:else}
                      <div>Une erreur s'est produite lors du chargement des messages.</div>
                    {/if}
                </div>
                {:else if tabSet === 2}
                  {#if loadingSignalement}
                    loading...
                  {:else if signalements != null}
                    <Datatable datatable={signalements} onRowClick={handleRowClick}/>
                  {:else}
                    <div>Une erreur s'est produite lors du chargement des signalements.</div>
                  {/if}
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
  </div>
  {:else}
  <div>Une erreur s'est produite lors du chargement des données utilisateur.</div>
{/if}