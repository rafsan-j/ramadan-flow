<script>
	import { settings } from '../stores/appStore.js';
	import { db } from '../utils/db.js';
	
	export let dua;
	export let compact = false;
	
	let isFavorite = false;
	let showTranslation = false;
	
	$: language = $settings?.language || 'en';
	
	async function checkFavorite() {
		const favorites = await db.getFavorites();
		isFavorite = favorites.includes(dua.id);
	}
	
	async function toggleFavorite() {
		await db.toggleFavorite(dua.id);
		await checkFavorite();
	}
	
	function toggleTranslation() {
		showTranslation = !showTranslation;
	}
	
	checkFavorite();
</script>

<div class="dua-card" class:compact>
	<div class="dua-header">
		<h3 class="dua-title">{dua.title[language]}</h3>
		<button class="favorite-btn" on:click={toggleFavorite} aria-label="Favorite">
			<svg width="20" height="20" viewBox="0 0 20 20" fill={isFavorite ? 'currentColor' : 'none'}>
				<path
					d="M10 3.5C10 3.5 6 1 3 4C0 7 2 11 10 16.5C18 11 20 7 17 4C14 1 10 3.5 10 3.5Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
	
	<div class="dua-arabic arabic">
		{dua.arabic}
	</div>
	
	{#if !compact}
		<div class="dua-transliteration">
			{dua.transliteration}
		</div>
	{/if}
	
	<button class="reveal-btn" on:click={toggleTranslation}>
		{showTranslation ? '▲ Hide Translation' : '▼ Reveal Translation'}
	</button>
	
	{#if showTranslation}
		<div class="dua-translation animate-slide-up" class:bengali={language === 'bn'}>
			{dua.translation[language]}
		</div>
	{/if}
</div>

<style>
	.dua-card {
		background: var(--color-bg-card);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-md);
		border: 1px solid var(--color-border);
	}
	
	.dua-card.compact {
		padding: var(--space-md);
	}
	
	.dua-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-md);
	}
	
	.dua-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}
	
	.favorite-btn {
		background: none;
		border: none;
		color: var(--color-mercy);
		cursor: pointer;
		padding: 0.25rem;
		transition: transform var(--transition-fast);
	}
	
	.favorite-btn:hover {
		transform: scale(1.1);
	}
	
	.dua-arabic {
		font-size: 1.5rem;
		line-height: 2.5;
		margin-bottom: var(--space-md);
		padding: var(--space-md);
		background: var(--color-surface);
		border-radius: var(--radius-md);
		text-align: center;
	}
	
	.dua-transliteration {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		font-style: italic;
		margin-bottom: var(--space-md);
		text-align: center;
	}
	
	.reveal-btn {
		width: 100%;
		padding: var(--space-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--transition-fast);
		margin-bottom: var(--space-sm);
	}
	
	.reveal-btn:hover {
		background: var(--color-bg-secondary);
		color: var(--color-text-primary);
	}
	
	.dua-translation {
		padding: var(--space-md);
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-radius: var(--radius-md);
		color: var(--color-text-primary);
		line-height: 1.8;
		font-size: 0.95rem;
	}
</style>