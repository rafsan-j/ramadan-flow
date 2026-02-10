<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { initializeApp, focusState } from '../lib/stores/appStore.js';
	import { db } from '../lib/utils/db.js';
	
	let isOnboarded = false;
	let isLoading = true;
	
	onMount(async () => {
		isOnboarded = await db.isOnboarded();
		
		if (isOnboarded) {
			await initializeApp();
		}
		
		isLoading = false;
	});
	
	$: if (typeof document !== 'undefined') {
		document.body.setAttribute('data-focus-state', $focusState);
	}
</script>

<svelte:head>
	<title>Ramadan Flow - Your Spiritual Companion</title>
</svelte:head>

{#if isLoading}
	<div class="loading-screen">
		<div class="loading-spinner"></div>
		<p>Loading...</p>
	</div>
{:else}
	<slot />
{/if}

<style>
	.loading-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: var(--color-bg-primary);
	}
	
	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 4px solid var(--color-border);
		border-top-color: var(--color-progress-75);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	
	.loading-screen p {
		margin-top: var(--space-lg);
		color: var(--color-text-secondary);
		font-weight: 500;
	}
</style>