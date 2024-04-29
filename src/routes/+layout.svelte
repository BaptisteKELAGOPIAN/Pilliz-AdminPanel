<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Logo from '../media/img/logo.png';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import SideMenu from "./sideMenu.svelte";
	import { page } from '$app/stores';

</script>

<!-- App Shell -->
{#if $page.url.pathname != '/login'}
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<img src={Logo} alt="Skeleton Logo" class="h-11"/>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://discord.gg/EXqV7W8MtY"
						target="_blank"
						rel="noreferrer"
					>
						Discord
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://twitter.com/SkeletonUI"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://github.com/skeletonlabs/skeleton"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					<LightSwitch />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<!-- Page Route Content -->
		<slot />
		<svelte:fragment slot="sidebarLeft"><SideMenu></SideMenu></svelte:fragment>
	</AppShell>
{:else}
	<slot />
{/if}