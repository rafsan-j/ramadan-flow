<script>
	import { onMount } from 'svelte';
	import { settings, addSadaqahEntry } from '../../lib/stores/appStore.js';
	import { db } from '../../lib/utils/db.js';
	
	let amount = '';
	let category = 'mosque';
	let isSmile = false;
	let hideAmounts = false;
	let totalSadaqah = { total: 0, count: 0 };
	let showForm = false;
	
	const categories = [
		{ id: 'mosque', icon: '🕌', label: { en: 'Mosque', bn: 'মসজিদ' } },
		{ id: 'poor', icon: '🤲', label: { en: 'Poor', bn: 'দরিদ্র' } },
		{ id: 'family', icon: '👨‍👩‍👧', label: { en: 'Family', bn: 'পরিবার' } },
		{ id: 'water', icon: '💧', label: { en: 'Water/Animal', bn: 'পানি/প্রাণী' } }
	];
	
	onMount(async () => {
		await loadSadaqah();
	});
	
	async function loadSadaqah() {
		totalSadaqah = await db.getSadaqahTotal();
	}
	
	async function addSadaqah() {
		const entry = {
			amount: isSmile ? 0 : parseFloat(amount) || 0,
			category,
			isSmile,
			hidden: hideAmounts
		};
		
		await addSadaqahEntry(entry);
		await loadSadaqah();
		
		amount = '';
		isSmile = false;
		showForm = false;
	}
	
	function quickAmount(value) {
		amount = value.toString();
	}
	
	$: lang = $settings?.language || 'en';
</script>

<div class="sadaqah-page">
	<div class="container">
		<header class="page-header">
			<a href="/dashboard" class="back-link">← {lang === 'en' ? 'Back' : 'পিছনে'}</a>
			<h1>{lang === 'en' ? '💚 Sadaqah Ledger' : '💚 সাদাকা খাতা'}</h1>
		</header>
		
		<div class="summary-card card">
			<div class="summary-icon">🌳</div>
			<h2 class="summary-title">
				{lang === 'en' ? 'Your Tree of Barakah' : 'আপনার বরকতের গাছ'}
			</h2>
			
			{#if !hideAmounts && totalSadaqah.total > 0}
				<div class="total-amount">
					৳{totalSadaqah.total.toLocaleString()}
				</div>
			{/if}
			
			<div class="total-days">
				{totalSadaqah.count} {lang === 'en' ? 'days of giving' : 'দিন দান করেছেন'}
			</div>
			
			<div class="hadith-quote">
				<p class:bengali={lang === 'bn'}>
					{lang === 'en' 
						? '"Charity does not decrease wealth."' 
						: '"দান করলে সম্পদ কমে না।"'}
				</p>
				<cite>— Sahih Muslim</cite>
			</div>
		</div>
		
		<div class="privacy-card card">
			<div class="privacy-header">
				<span>{lang === 'en' ? '🔒 Hide Amounts' : '🔒 পরিমাণ লুকান'}</span>
				<button 
					class="toggle-btn" 
					class:active={hideAmounts}
					on:click={() => hideAmounts = !hideAmounts}
				>
					<div class="toggle-switch">
						<div class="toggle-knob"></div>
					</div>
				</button>
			</div>
			<p class="privacy-note">
				{lang === 'en'
					? 'The left hand should not know what the right hand gives'
					: 'ডান হাত যা দেয় বাম হাত যেন তা না জানে'}
			</p>
		</div>
		
		{#if !showForm}
			<button class="btn btn-primary btn-large btn-block" on:click={() => showForm = true}>
				{lang === 'en' ? '+ Add Sadaqah' : '+ সাদাকা যোগ করুন'}
			</button>
		{/if}
		
		{#if showForm}
			<div class="add-form card animate-slide-up">
				<h3>{lang === 'en' ? 'Log Your Sadaqah' : 'আপনার সাদাকা নথিভুক্ত করুন'}</h3>
				
				<div class="category-grid">
					{#each categories as cat}
						<button
							class="category-btn"
							class:active={category === cat.id}
							on:click={() => category = cat.id}
						>
							<span class="category-icon">{cat.icon}</span>
							<span class="category-label">{cat.label[lang]}</span>
						</button>
					{/each}
				</div>
				
				<label class="smile-toggle">
					<input type="checkbox" bind:checked={isSmile} />
					<span>{lang === 'en' ? '😊 I made someone smile today' : '😊 আমি আজ কাউকে হাসালাম'}</span>
				</label>
				
				{#if !isSmile}
					<div class="amount-section">
						<label for="amount">
							{lang === 'en' ? 'Amount (BDT)' : 'পরিমাণ (টাকা)'}
						</label>
						<input
							id="amount"
							type="number"
							bind:value={amount}
							placeholder="0"
							class="amount-input"
						/>
						
						<div class="quick-amounts">
							{#each [10, 50, 100, 500] as amt}
								<button
									class="quick-btn"
									on:click={() => quickAmount(amt)}
								>
									৳{amt}
								</button>
							{/each}
						</div>
					</div>
				{/if}
				
				<div class="form-actions">
					<button class="btn btn-secondary" on:click={() => showForm = false}>
						{lang === 'en' ? 'Cancel' : 'বাতিল'}
					</button>
					<button 
						class="btn btn-primary" 
						on:click={addSadaqah}
						disabled={!isSmile && !amount}
					>
						{lang === 'en' ? 'Save' : 'সংরক্ষণ'}
					</button>
				</div>
			</div>
		{/if}
		
		<div style="height: 80px;"></div>
	</div>
</div>

<style>
	.sadaqah-page {
		min-height: 100vh;
		padding: var(--space-lg) 0;
	}
	
	.page-header {
		margin-bottom: var(--space-xl);
	}
	
	.back-link {
		display: inline-block;
		color: var(--color-text-secondary);
		text-decoration: none;
		margin-bottom: var(--space-sm);
		font-weight: 500;
	}
	
	.summary-card {
		text-align: center;
		padding: var(--space-xl);
		margin-bottom: var(--space-lg);
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
	}
	
	.summary-icon {
		font-size: 4rem;
		margin-bottom: var(--space-md);
	}
	
	.summary-title {
		margin-bottom: var(--space-lg);
		color: var(--color-progress-75);
	}
	
	.total-amount {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-progress-75);
		margin-bottom: var(--space-sm);
	}
	
	.total-days {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		font-weight: 500;
		margin-bottom: var(--space-lg);
	}
	
	.hadith-quote {
		background: white;
		padding: var(--space-lg);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--color-progress-75);
	}
	
	.hadith-quote p {
		margin: 0 0 var(--space-sm) 0;
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-text-primary);
		font-style: italic;
	}
	
	.hadith-quote cite {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-style: normal;
	}
	
	.privacy-card {
		margin-bottom: var(--space-lg);
	}
	
	.privacy-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-sm);
	}
	
	.privacy-note {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-style: italic;
		margin: 0;
	}
	
	.toggle-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}
	
	.toggle-switch {
		width: 52px;
		height: 28px;
		background: var(--color-border);
		border-radius: var(--radius-full);
		position: relative;
		transition: background var(--transition-fast);
	}
	
	.toggle-btn.active .toggle-switch {
		background: var(--color-progress-75);
	}
	
	.toggle-knob {
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		position: absolute;
		top: 3px;
		left: 3px;
		transition: transform var(--transition-fast);
	}
	
	.toggle-btn.active .toggle-knob {
		transform: translateX(24px);
	}
	
	.add-form {
		margin-bottom: var(--space-lg);
	}
	
	.add-form h3 {
		margin-bottom: var(--space-lg);
	}
	
	.category-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-sm);
		margin-bottom: var(--space-lg);
	}
	
	.category-btn {
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		transition: all var(--transition-fast);
	}
	
	.category-btn:hover {
		border-color: var(--color-progress-50);
	}
	
	.category-btn.active {
		background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
		border-color: var(--color-progress-75);
	}
	
	.category-icon {
		font-size: 2rem;
	}
	
	.category-label {
		font-weight: 600;
		font-size: 0.875rem;
	}
	
	.smile-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		border-radius: var(--radius-md);
		cursor: pointer;
		margin-bottom: var(--space-lg);
	}
	
	.smile-toggle input {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}
	
	.amount-section {
		margin-bottom: var(--space-lg);
	}
	
	.amount-section label {
		display: block;
		margin-bottom: var(--space-sm);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.amount-input {
		width: 100%;
		padding: var(--space-md);
		font-size: 1.5rem;
		font-weight: 600;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-ui);
		text-align: center;
	}
	
	.amount-input:focus {
		outline: none;
		border-color: var(--color-progress-50);
	}
	
	.quick-amounts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-sm);
		margin-top: var(--space-md);
	}
	
	.quick-btn {
		padding: var(--space-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}
	
	.quick-btn:hover {
		background: var(--color-progress-50);
		color: white;
		border-color: var(--color-progress-50);
	}
	
	.form-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}
	
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>