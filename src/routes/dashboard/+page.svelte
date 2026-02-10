<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		settings,
		currentLog,
		prayerTimes,
		focusState,
		nextPrayer,
		ramadanDay,
		dailyProgress,
		initializeApp
	} from '../../lib/stores/appStore.js';
	import { db } from '../../lib/utils/db.js';
	import { formatPrayerTime, getTimeUntil, isLastTenNights } from '../../lib/utils/prayerTimes.js';
	import { getDuaForContext, getRandomHadith } from '../../lib/utils/content.js';
	import ProgressRing from '../../lib/components/ProgressRing.svelte';
	import PrayerCheckbox from '../../lib/components/PrayerCheckbox.svelte';
	import DuaCard from '../../lib/components/DuaCard.svelte';
	
	let isOnboarded = false;
	let timeUntilNext = { hours: 0, minutes: 0, seconds: 0 };
	let currentDua = null;
	let hadith = null;
	let showHadith = false;
	
	onMount(async () => {
		isOnboarded = await db.isOnboarded();
		
		if (!isOnboarded) {
			goto('/');
			return;
		}
		
		await initializeApp();
		updateCountdown();
		hadith = getRandomHadith();
		
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});
	
	function updateCountdown() {
		if ($nextPrayer) {
			timeUntilNext = getTimeUntil($nextPrayer.time);
		}
	}
	
	$: if ($focusState && $ramadanDay) {
		const isLast10 = isLastTenNights($ramadanDay);
		currentDua = getDuaForContext($focusState, isLast10);
	}
	
	$: lang = $settings?.language || 'en';
	
	$: focusStateText = {
		dawn: { en: 'Dawn State', bn: 'ভোরের সময়' },
		preservation: { en: 'Preservation State', bn: 'সংরক্ষণ সময়' },
		rejuvenation: { en: 'Rejuvenation State', bn: 'পুনর্জীবন সময়' }
	}[$focusState];
	
	$: prayerNames = {
		fajr: { en: 'Fajr', bn: 'ফজর' },
		dhuhr: { en: 'Dhuhr', bn: 'যুহর' },
		asr: { en: 'Asr', bn: 'আসর' },
		maghrib: { en: 'Maghrib', bn: 'মাগরিব' },
		isha: { en: 'Isha', bn: 'এশা' },
		taraweeh: { en: 'Taraweeh', bn: 'তারাবীহ' }
	};
	
	function handlePrayerComplete() {
		const prayerCount = Object.values($currentLog.prayers).filter(p => p === true).length;
		if (prayerCount === 5 && !showHadith) {
			showHadith = true;
			setTimeout(() => showHadith = false, 10000);
		}
	}
	
	async function quickQuran() {
		const { updateQuranPages } = await import('../../lib/stores/appStore.js');
		await updateQuranPages($currentLog.quranPages + 1);
	}
</script>

<svelte:head>
	<title>Dashboard - Ramadan Flow</title>
</svelte:head>

{#if $settings && $currentLog && $prayerTimes}
	<div class="dashboard">
		<div class="container">
			<header class="dashboard-header">
				<div class="header-content">
					<h1 class="greeting">
						{lang === 'en' ? 'As-salamu alaykum' : 'আসসালামু আলাইকুম'} 🌙
					</h1>
					<p class="ramadan-day">
						{lang === 'en' ? `Day ${$ramadanDay} of Ramadan` : `রমজানের ${$ramadanDay} দিন`}
					</p>
				</div>
				
				<div class="focus-badge" data-state={$focusState}>
					{focusStateText[lang]}
				</div>
			</header>
			
			<div class="progress-section card animate-scale-in">
				<ProgressRing
					percentage={$dailyProgress.percentage}
					size={160}
					strokeWidth={12}
					label={lang === 'en' ? 'Daily Progress' : 'দৈনিক অগ্রগতি'}
				/>
				
				<div class="progress-details">
					<div class="progress-item">
						<span class="progress-label">{lang === 'en' ? 'Completed' : 'সম্পন্ন'}</span>
						<span class="progress-value">{$dailyProgress.completed} / {$dailyProgress.total}</span>
					</div>
				</div>
			</div>
			
			{#if $nextPrayer}
				<div class="next-prayer card">
					<div class="next-prayer-header">
						<span class="next-label">{lang === 'en' ? 'Next Prayer' : 'পরবর্তী নামাজ'}</span>
						<h2 class="next-prayer-name">{prayerNames[$nextPrayer.name][lang]}</h2>
					</div>
					
					<div class="countdown">
						<div class="countdown-unit">
							<span class="countdown-value">{String(timeUntilNext.hours).padStart(2, '0')}</span>
							<span class="countdown-label">{lang === 'en' ? 'hours' : 'ঘন্টা'}</span>
						</div>
						<span class="countdown-separator">:</span>
						<div class="countdown-unit">
							<span class="countdown-value">{String(timeUntilNext.minutes).padStart(2, '0')}</span>
							<span class="countdown-label">{lang === 'en' ? 'min' : 'মিনিট'}</span>
						</div>
						<span class="countdown-separator">:</span>
						<div class="countdown-unit">
							<span class="countdown-value">{String(timeUntilNext.seconds).padStart(2, '0')}</span>
							<span class="countdown-label">{lang === 'en' ? 'sec' : 'সেকেন্ড'}</span>
						</div>
					</div>
				</div>
			{/if}
			
			<section class="tracking-section">
				<h3 class="section-title">
					{lang === 'en' ? '🕌 Today\'s Prayers' : '🕌 আজকের নামাজ'}
				</h3>
				
				<div class="prayer-grid">
					{#each Object.entries(prayerNames) as [prayer, names]}
						{#if prayer !== 'taraweeh' || $settings.track !== 'essential'}
							<div on:click={handlePrayerComplete}>
								<PrayerCheckbox
									prayerName={prayer}
									checked={$currentLog.prayers[prayer]}
									label={names[lang]}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</section>
			
			{#if $settings.track !== 'essential'}
				<section class="quran-section card">
					<div class="quran-header">
						<h3 class="section-title">
							{lang === 'en' ? '📖 Quran Progress' : '📖 কুরআন অগ্রগতি'}
						</h3>
						<button class="quick-btn" on:click={quickQuran}>
							+1 {lang === 'en' ? 'Page' : 'পৃষ্ঠা'}
						</button>
					</div>
					
					<div class="quran-progress-bar">
						<div
							class="quran-progress-fill"
							style="width: {Math.min(100, ($currentLog.quranPages / $settings.quranGoal) * 100)}%"
						></div>
					</div>
					
					<p class="quran-count">
						{$currentLog.quranPages} / {$settings.quranGoal} {lang === 'en' ? 'pages' : 'পৃষ্ঠা'}
					</p>
				</section>
			{/if}
			
			{#if currentDua}
				<section class="dua-section">
					<h3 class="section-title">
						{lang === 'en' ? '✨ Dua of the Moment' : '✨ এই মুহূর্তের দোয়া'}
					</h3>
					<DuaCard dua={currentDua} />
				</section>
			{/if}
			
			{#if showHadith && hadith}
				<div class="hadith-popup animate-slide-up">
					<div class="hadith-content">
						<div class="hadith-icon">📜</div>
						<p class="hadith-text" class:bengali={lang === 'bn'}>{hadith.text[lang]}</p>
						<p class="hadith-source">{hadith.source}</p>
					</div>
					<button class="close-hadith" on:click={() => showHadith = false}>×</button>
				</div>
			{/if}
			
			<nav class="bottom-nav">
				<a href="/dashboard" class="nav-item active">
					<span class="nav-icon">🏠</span>
					<span class="nav-label">{lang === 'en' ? 'Home' : 'হোম'}</span>
				</a>
				<a href="/heatmap" class="nav-item">
					<span class="nav-icon">📊</span>
					<span class="nav-label">{lang === 'en' ? 'Progress' : 'অগ্রগতি'}</span>
				</a>
				<a href="/sadaqah" class="nav-item">
					<span class="nav-icon">💚</span>
					<span class="nav-label">{lang === 'en' ? 'Sadaqah' : 'সাদাকা'}</span>
				</a>
				<a href="/library" class="nav-item">
					<span class="nav-icon">📚</span>
					<span class="nav-label">{lang === 'en' ? 'Library' : 'লাইব্রেরি'}</span>
				</a>
			</nav>
		</div>
	</div>
{/if}

<style>
	.dashboard {
		min-height: 100vh;
		padding-bottom: 80px;
	}
	
	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-xl);
		padding-top: var(--space-lg);
	}
	
	.greeting {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}
	
	.ramadan-day {
		color: var(--color-text-secondary);
		font-weight: 500;
	}
	
	.focus-badge {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		white-space: nowrap;
	}
	
	.focus-badge[data-state="dawn"] {
		background: linear-gradient(135deg, #fef3e2 0%, #fde68a 100%);
		color: #92400e;
	}
	
	.focus-badge[data-state="preservation"] {
		background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
		color: #075985;
	}
	
	.focus-badge[data-state="rejuvenation"] {
		background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
		color: #9f1239;
	}
	
	.progress-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-xl);
		margin-bottom: var(--space-lg);
	}
	
	.progress-details {
		margin-top: var(--space-lg);
		width: 100%;
	}
	
	.progress-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.progress-label {
		color: var(--color-text-secondary);
		font-weight: 500;
	}
	
	.progress-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}
	
	.next-prayer {
		margin-bottom: var(--space-lg);
	}
	
	.next-prayer-header {
		text-align: center;
		margin-bottom: var(--space-lg);
	}
	
	.next-label {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}
	
	.next-prayer-name {
		font-size: 1.75rem;
		margin: 0.5rem 0 0 0;
		color: var(--color-progress-75);
	}
	
	.countdown {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--space-sm);
	}
	
	.countdown-unit {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.countdown-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text-primary);
		font-variant-numeric: tabular-nums;
	}
	
	.countdown-label {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-top: 0.25rem;
	}
	
	.countdown-separator {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text-tertiary);
		margin: 0 0.5rem;
	}
	
	.tracking-section {
		margin-bottom: var(--space-xl);
	}
	
	.section-title {
		margin-bottom: var(--space-md);
		font-size: 1.25rem;
	}
	
	.prayer-grid {
		display: grid;
		gap: var(--space-sm);
	}
	
	.quran-section {
		margin-bottom: var(--space-xl);
	}
	
	.quran-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-md);
	}
	
	.quran-header .section-title {
		margin: 0;
	}
	
	.quick-btn {
		background: var(--color-progress-75);
		color: white;
		border: none;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}
	
	.quick-btn:hover {
		background: var(--color-progress-100);
		transform: scale(1.05);
	}
	
	.quran-progress-bar {
		width: 100%;
		height: 12px;
		background: var(--color-border);
		border-radius: var(--radius-full);
		overflow: hidden;
		margin-bottom: var(--space-sm);
	}
	
	.quran-progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #86efac 0%, #22c55e 100%);
		border-radius: var(--radius-full);
		transition: width var(--transition-slow);
	}
	
	.quran-count {
		text-align: center;
		font-weight: 600;
		color: var(--color-text-secondary);
		margin: 0;
	}
	
	.dua-section {
		margin-bottom: var(--space-xl);
	}
	
	.hadith-popup {
		position: fixed;
		bottom: 80px;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100% - 2rem);
		max-width: 480px;
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-xl);
		z-index: 1000;
	}
	
	.hadith-content {
		text-align: center;
	}
	
	.hadith-icon {
		font-size: 2rem;
		margin-bottom: var(--space-sm);
	}
	
	.hadith-text {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-text-primary);
		margin-bottom: var(--space-sm);
		font-weight: 500;
	}
	
	.hadith-source {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-style: italic;
		margin: 0;
	}
	
	.close-hadith {
		position: absolute;
		top: var(--space-sm);
		right: var(--space-sm);
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.8);
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		color: var(--color-text-secondary);
	}
	
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--color-bg-card);
		border-top: 1px solid var(--color-border);
		display: flex;
		justify-content: space-around;
		padding: var(--space-sm) 0;
		box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
		z-index: 100;
	}
	
	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: var(--space-sm);
		text-decoration: none;
		color: var(--color-text-tertiary);
		transition: color var(--transition-fast);
		flex: 1;
	}
	
	.nav-item.active {
		color: var(--color-progress-75);
	}
	
	.nav-icon {
		font-size: 1.5rem;
	}
	
	.nav-label {
		font-size: 0.75rem;
		font-weight: 500;
	}
	
	@media (max-width: 380px) {
		.countdown-value {
			font-size: 1.5rem;
		}
		
		.next-prayer-name {
			font-size: 1.5rem;
		}
	}
</style>