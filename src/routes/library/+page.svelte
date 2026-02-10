<script>
	import { onMount } from 'svelte';
	import { settings } from '../../lib/stores/appStore.js';
	import { duaLibrary, hadithLibrary } from '../../lib/utils/content.js';
	import { db } from '../../lib/utils/db.js';
	import DuaCard from '../../lib/components/DuaCard.svelte';
	
	let activeTab = 'duas';
	let favorites = [];
	let searchQuery = '';
	
	onMount(async () => {
		favorites = await db.getFavorites();
	});
	
	$: lang = $settings?.language || 'en';
	
	$: duas = Object.values(duaLibrary);
	$: filteredDuas = duas.filter(dua => {
		if (!searchQuery) return true;
		const search = searchQuery.toLowerCase();
		return (
			dua.title.en.toLowerCase().includes(search) ||
			dua.title.bn.includes(search) ||
			dua.arabic.includes(search) ||
			dua.transliteration.toLowerCase().includes(search)
		);
	});
	
	$: favoriteDuas = duas.filter(dua => favorites.includes(dua.id));
</script>

<div class="library-page">
	<div class="container">
		<header class="page-header">
			<a href="/dashboard" class="back-link">← {lang === 'en' ? 'Back' : 'পিছনে'}</a>
			<h1>{lang === 'en' ? '📚 Spiritual Library' : '📚 আধ্যাত্মিক লাইব্রেরি'}</h1>
		</header>
		
		<div class="search-container">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder={lang === 'en' ? 'Search duas...' : 'দোয়া খুঁজুন...'}
				class="search-input"
			/>
		</div>
		
		<div class="tabs">
			<button
				class="tab"
				class:active={activeTab === 'duas'}
				on:click={() => activeTab = 'duas'}
			>
				{lang === 'en' ? 'All Duas' : 'সব দোয়া'}
			</button>
			<button
				class="tab"
				class:active={activeTab === 'favorites'}
				on:click={() => activeTab = 'favorites'}
			>
				{lang === 'en' ? 'Favorites' : 'প্রিয়'}
			</button>
			<button
				class="tab"
				class:active={activeTab === 'hadith'}
				on:click={() => activeTab = 'hadith'}
			>
				{lang === 'en' ? 'Hadith' : 'হাদিস'}
			</button>
		</div>
		
		<div class="content-area">
			{#if activeTab === 'duas'}
				<div class="duas-list">
					{#if filteredDuas.length === 0}
						<p class="no-results">
							{lang === 'en' ? 'No duas found' : 'কোন দোয়া পাওয়া যায়নি'}
						</p>
					{:else}
						{#each filteredDuas as dua}
							<div class="dua-item">
								<DuaCard {dua} />
							</div>
						{/each}
					{/if}
				</div>
			
			{:else if activeTab === 'favorites'}
				<div class="duas-list">
					{#if favoriteDuas.length === 0}
						<div class="empty-state card">
							<div class="empty-icon">💫</div>
							<h3>{lang === 'en' ? 'No Favorites Yet' : 'এখনও কোন প্রিয় নেই'}</h3>
							<p>
								{lang === 'en' 
									? 'Tap the heart icon on any dua to add it to your favorites'
									: 'আপনার প্রিয়তে যোগ করতে যেকোনো দোয়ার হার্ট আইকনে ট্যাপ করুন'}
							</p>
						</div>
					{:else}
						{#each favoriteDuas as dua}
							<div class="dua-item">
								<DuaCard {dua} />
							</div>
						{/each}
					{/if}
				</div>
			
			{:else if activeTab === 'hadith'}
				<div class="hadith-list">
					{#each hadithLibrary as hadith}
						<div class="hadith-card card">
							<div class="hadith-icon">📜</div>
							<p class="hadith-text" class:bengali={lang === 'bn'}>
								{hadith.text[lang]}
							</p>
							<cite class="hadith-source">{hadith.source}</cite>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		
		<div style="height: 80px;"></div>
	</div>
</div>

<style>
	.library-page {
		min-height: 100vh;
		padding: var(--space-lg) 0;
	}
	
	.page-header {
		margin-bottom: var(--space-lg);
	}
	
	.back-link {
		display: inline-block;
		color: var(--color-text-secondary);
		text-decoration: none;
		margin-bottom: var(--space-sm);
		font-weight: 500;
	}
	
	.back-link:hover {
		color: var(--color-text-primary);
	}
	
	.search-container {
		margin-bottom: var(--space-lg);
	}
	
	.search-input {
		width: 100%;
		padding: var(--space-md);
		font-size: 1rem;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-ui);
		background: var(--color-bg-card);
	}
	
	.search-input:focus {
		outline: none;
		border-color: var(--color-progress-50);
	}
	
	.tabs {
		display: flex;
		gap: var(--space-sm);
		margin-bottom: var(--space-lg);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.tab {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
		flex-shrink: 0;
	}
	
	.tab:hover {
		border-color: var(--color-progress-50);
	}
	
	.tab.active {
		background: var(--color-progress-75);
		color: white;
		border-color: var(--color-progress-75);
	}
	
	.content-area {
		animation: fadeIn 0.3s ease-in;
	}
	
	.duas-list,
	.hadith-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
	
	.dua-item {
		animation: slideUp 0.3s ease-out;
	}
	
	.no-results {
		text-align: center;
		padding: var(--space-xl);
		color: var(--color-text-secondary);
	}
	
	.empty-state {
		text-align: center;
		padding: var(--space-2xl);
	}
	
	.empty-icon {
		font-size: 4rem;
		margin-bottom: var(--space-lg);
	}
	
	.empty-state h3 {
		margin-bottom: var(--space-md);
		color: var(--color-text-primary);
	}
	
	.empty-state p {
		color: var(--color-text-secondary);
		max-width: 300px;
		margin: 0 auto;
	}
	
	.hadith-card {
		padding: var(--space-lg);
	}
	
	.hadith-icon {
		font-size: 2rem;
		text-align: center;
		margin-bottom: var(--space-md);
	}
	
	.hadith-text {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-text-primary);
		margin-bottom: var(--space-md);
		font-style: italic;
		text-align: center;
	}
	
	.hadith-source {
		display: block;
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-style: normal;
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>