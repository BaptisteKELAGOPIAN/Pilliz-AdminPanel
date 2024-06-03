<script lang="ts">
    import { AppRail, AppRailAnchor, AppRailTile } from "@skeletonlabs/skeleton";
	import { page } from '$app/stores';
    import { faFlag, faGauge, faTicket, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'
</script>

<AppRail>
	<AppRailAnchor href="/dashboard" selected={$page.url.pathname === '/dashboard'}>
		<svelte:fragment slot="lead"><Fa size="1.7x" icon={faGauge}/></svelte:fragment>
		<span>Dashboard</span>
	</AppRailAnchor>
	<AppRailAnchor href="/ticket" selected={$page.url.pathname === '/ticket'}>
		<svelte:fragment slot="lead"><Fa size="1.7x" icon={faTicket}/></svelte:fragment>
		<span>Ticket</span>
	</AppRailAnchor>
	<AppRailAnchor href="/signalement" selected={$page.url.pathname === '/signalement'}>
		<svelte:fragment slot="lead"><Fa size="1.7x" icon={faTriangleExclamation}/></svelte:fragment>
		<span>Signalement</span>
	</AppRailAnchor>
</AppRail>