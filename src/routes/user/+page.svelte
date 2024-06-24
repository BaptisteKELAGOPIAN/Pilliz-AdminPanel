<script lang="ts">
    import { Avatar, TabGroup, Tab } from '@skeletonlabs/skeleton';
  
    // Définissez l'interface de l'utilisateur
    interface User {
      id: string;
      email: string;
      name: string;
      password: string;
      role: string;
      createdAt: Date;
      updatedAt: Date;
      firstConnection: boolean;
      tutorialFeed: boolean;
      tutorialMarketplace: boolean;
      tutorialPro: boolean;
      banned: string;
      Post: any[];
      Like: any[];
      Repost: any[];
      Comment: any[];
      bio: string;
      followedBy: any[];
      following: any[];
      Conversations: any[];
      MessagesSend: any[];
      MessagesReceived: any[];
      isConnected: boolean;
      profilPicture: string;
      NotificatifionReceived: any[];
      NotificationSend: any[];
      codeVerification: number;
      isVerified: boolean;
      Reports: any[];
      Documents: any[];
      // Métriques
      country: string;
      totalAppTime: number;
      totalFeedTime: number;
      totalMarketTime: number;
      totalProTime: number;
      deviceRelease: string;
      deviceVersion: string;
      deviceName: string;
      deviceWidth: number;
      deviceHeight: number;
      ticket: any[];
      signalement: any[];
    }
  
    // Créez un exemple d'utilisateur
    const user: User = {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '********',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      firstConnection: true,
      tutorialFeed: false,
      tutorialMarketplace: false,
      tutorialPro: false,
      banned: 'notBanned',
      Post: [],
      Like: [],
      Repost: [],
      Comment: [],
      bio: 'A propos de moi',
      followedBy: ["salut", "hello", "hola", "ciao", "hallo"],
      following: ['salut', 'hello', 'hola', 'ciao'],
      Conversations: [],
      MessagesSend: [],
      MessagesReceived: [],
      isConnected: false,
      profilPicture: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
      NotificatifionReceived: [],
      NotificationSend: [],
      codeVerification: 0,
      isVerified: false,
      Reports: [],
      Documents: [],
      // Métriques
      country: 'France',
      totalAppTime: 4500,
      totalFeedTime: 100,
      totalMarketTime: 250,
      totalProTime: 0,
      deviceRelease: 'Euro',
      deviceVersion: '',
      deviceName: 'Ipad',
      deviceWidth: 450,
      deviceHeight: 300,
      ticket: [],
      signalement: [],
    };

    let tabSet: number = 0;
  </script>
  
  <div class="py-5 px-5 flex w-full">
    <div class="card py-5 px-5 flex flex-col w-1/3">
        <div class="relative inline-block">
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">20</div>
            <Avatar />
        </div>
        <div class="flex flex-col gap-2">
        <div>
            {user.bio}
        </div>
        <div class="flex gap-2">
          <span> {user.name}</span>
        </div>
        <div class="flex gap-2">
          <span>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </span>
        </div>
        <div class="flex gap-2">
          <span class="font-bold">Inscrit depuis:</span>
          <span>{user.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
    <div class="card flex w-full">
        <TabGroup justify="justify-center" class="flex flex-grow w-full flex-col">
            <!-- <Tab bind:group={tabSet} name="tab1" value={0}>
                <svelte:fragment slot="lead">(icon)</svelte:fragment>
                <span>(label 1)</span>
            </Tab> -->
            <div class="flex flex-row">
                <Tab bind:group={tabSet} name="tab2" value={0}>Detail</Tab>
                <Tab bind:group={tabSet} name="tab2" value={1}>Messages</Tab>
                <Tab bind:group={tabSet} name="tab3" value={2}>Tickets/Signalement</Tab>
            </div>
            <!-- Tab Panels --->
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                <div class="flex flex-wrap flex-row">
                    <div class="flex flex-wrap flex-col w-1/3">
                        <div><span>ID :</span> {user.id}</div>
                        <div><span>Email :</span> {user.email}</div>
                        <div><span>Nom :</span> {user.name}</div>
                        <div><span>Rôle :</span> {user.role}</div>
                        <div><span>Date de création :</span> {user.createdAt}</div>
                        <div><span>Date de mise à jour :</span> {user.updatedAt}</div>
                    </div>
                    <div class="flex flex-col w-1/3">
                        <div><span>Première connexion :</span> {user.firstConnection ? 'Oui' : 'Non'}</div>
                        <div><span>Tutoriel fil d'actualités :</span> {user.tutorialFeed ? 'Oui' : 'Non'}</div>
                        <div><span>Tutoriel marché :</span> {user.tutorialMarketplace ? 'Oui' : 'Non'}</div>
                        <div><span>Tutoriel pro :</span> {user.tutorialPro ? 'Oui' : 'Non'}</div>
                        <div><span>Statut de bannissement :</span> {user.banned}</div>
                        <div><span>Vérifié :</span> {user.isVerified ? 'Oui' : 'Non'}</div>
                        <div><span>Pays :</span> {user.country}</div>
                    </div>
                    <div class="flex flex-col w-1/3"> 
                        <div><span>Temps total sur l'application :</span> {user.totalAppTime}</div>
                        <div><span>Temps total sur le fil d'actualités :</span> {user.totalFeedTime}</div>
                        <div><span>Temps total sur le marché :</span> {user.totalMarketTime}</div>
                        <div><span>Temps total sur la version pro :</span> {user.totalProTime}</div>
                        <div><span>Version de l'appareil :</span> {user.deviceRelease}</div>
                        <div><span>Nom de l'appareil :</span> {user.deviceName}</div>
                        <div><span>Largeur de l'appareil :</span> {user.deviceWidth}</div>
                        <div><span>Hauteur de l'appareil :</span> {user.deviceHeight}</div>
                    </div>   
                  </div>
                {:else if tabSet === 1}
                    (tab panel 2 contents)
                {:else if tabSet === 2}
                    (tab panel 3 contents)
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
  </div>
  