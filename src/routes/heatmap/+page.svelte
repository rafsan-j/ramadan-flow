<script>
	import { onMount } from 'svelte';
	import { settings, ramadanDay } from '../../lib/stores/appStore.js';
	import { db } from '../../lib/utils/db.js';
	
	let logs = [];
	let stats = { totalPrayers: 0, totalQuran: 0, streak: 0, completion: 0 };
	
	onMount(async () => {
		logs = await db.getAllLogs();
		calculateStats();
	});
	
	function calculateStats() {
		let prayers = 0;
		let quran = 0;
		let currentStreak = 0;
		let completedDays = 0;
		
		logs.forEach((log, index) => {
			const prayerCount = Object.values(log.prayers).filter(p => p).length;
			prayers += prayerCount;
			quran += log.quranPages;
			
			if (prayerCount >= 5) {
				completedDays++;
				currentStreak = index === logs.length - 1 ? currentStreak + 1 : 0;
			}
		});
		
		stats = {
			totalPrayers: prayers,
			totalQuran: quran,
			streak: currentStreak,
			completion: logs.length > 0 ? Math.round((completedDays / logs.length) * 100) : 0
		};
	}
	
	function getDayProgress(log) {
		if (!log) return 0;
		const prayerCount = Object.values(log.prayers).filter(p => p).length;
		return Math.round((prayerCount / 6) * 100);
	}
	
	function getProgressColor(percentage) {
		if (percentage === 0) return 'var(--color-border)';
		if (percentage < 25) return 'var(--color-progress-0)';
		if (percentage < 50) return 'var(--color-progress-25)';
		if (percentage < 75) return 'var(--color-progress-50)';
		if (percentage < 100) return 'var(--color-progress-75)';
		return 'var(--color-progress-100)';
	}
	
	$: lang = $settings?.language || 'en';
</script>

<div class="heatmap-page">
	<div class="container">
		<header class="page-header">
			<a href="/dashboard" class="back-link">← {lang === 'en' ? 'Back' : 'পিছনে'}</a>
			<h1>{lang === 'en' ? 'Your Ramadan Journey' : 'আপনার রমজান যাত্রা'}</h1>
		</header>
		
		<div class="stats-grid">
			<div class="stat-card card">
				<div class="stat-icon">🕌</div>
				<div class="stat-value">{stats.totalPrayers}</div>
				<div class="stat-label">{lang === 'en' ? 'Prayers' : 'নামাজ'}</div>
			</div>
			
			<div class="stat-card card">
				<div class="stat-icon">📖</div>
				<div class="stat-value">{stats.totalQuran}</div>
				<div class="stat-label">{lang === 'en' ? 'Quran Pages' : 'কুরআন পৃষ্ঠা'}</div>
			</div>
			
			<div class="stat-card card">
				<div class="stat-icon">🔥</div>
				<div class="stat-value">{stats.streak}</div>
				<div class="stat-label">{lang === 'en' ? 'Day Streak' : 'দিন ধারা'}</div>
			</div>
			
			<div class="stat-card card">
				<div class="stat-icon">✅</div>
				<div class="stat-value">{stats.completion}%</div>
				<div class="stat-label">{lang === 'en' ? 'Completion' : 'সম্পূর্ণতা'}</div>
			</div>
		</div>
		
		<div class="heatmap-container card">
			<h2 class="section-title">{lang === 'en' ? '30-Day Heatmap' : '৩০ দিনের হিটম্যাপ'}</h2>
			
			<div class="heatmap-grid">
				{#each Array(30) as _, index}
					{@const day = index + 1}
					{@const log = logs.find(l => l.date.endsWith(`-${String(day).padStart(2, '0')}`))}
					{@const progress = getDayProgress(log)}
					
					<div
						class="heatmap-cell"
						class:active={day <= $ramadanDay}
						class:complete={progress === 100}
						style="background-color: {getProgressColor(progress)}"
						title="{lang === 'en' ? 'Day' : 'দিন'} {day}: {progress}%"
					>
						<span class="day-number">{day}</span>
					</div>
				{/each}
			</div>
			
			<div class="heatmap-legend">
				<span>{lang === 'en' ? 'Less' : 'কম'}</span>
				<div class="legend-colors">
					{#each [0, 25, 50, 75, 100] as pct}
						<div class="legend-color" style="background-color: {getProgressColor(pct)}"></div>
					{/each}
				</div>
				<span>{lang === 'en' ? 'More' : 'বেশি'}</span>
			</div>
		</div>
		
		<div class="impact-summary card">
			<h2 class="section-title">{lang === 'en' ? '✨ Your Impact' : '✨ আপনার প্রভাব'}</h2>
			
			<div class="impact-content">
				{#if stats.totalPrayers > 0}
					<p class="impact-text">
						{#if lang === 'en'}
							You've spent approximately <strong>{Math.round(stats.totalPrayers * 15 / 60)} hours</strong> in worship this Ramadan.
						{:else}
							আপনি এই রমজানে প্রায় <strong>{Math.round(stats.totalPrayers * 15 / 60)} ঘন্টা</strong> ইবাদতে ব্যয় করেছেন।
						{/if}
					</p>
				{/if}
				
				{#if stats.totalQuran > 0}
					<p class="impact-text">
						{#if lang === 'en'}
							You've read <strong>{stats.totalQuran} pages</strong> of the Quran. Keep going!
						{:else}
							আপনি কুরআনের <strong>{stats.totalQuran} পৃষ্ঠা</strong> পড়েছেন। এগিয়ে যান!
						{/if}
					</p>
				{/if}
			</div>
		</div>
		
		<div style="height: 80px;"></div>
	</div>
</div>

<style>
	.heatmap-page {
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
	
	.back-link:hover {
		color: var(--color-text-primary);
	}
	
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
		margin-bottom: var(--space-xl);
	}
	
	.stat-card {
		text-align: center;
		padding: var(--space-lg);
	}
	
	.stat-icon {
		font-size: 2rem;
		margin-bottom: var(--space-sm);
	}
	
	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-progress-75);
		margin-bottom: 0.25rem;
	}
	
	.stat-label {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-weight: 500;
	}
	
	.heatmap-container {
		margin-bottom: var(--space-xl);
	}
	
	.section-title {
		margin-bottom: var(--space-lg);
	}
	
	.heatmap-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--space-sm);
		margin-bottom: var(--space-lg);
	}
	
	.heatmap-cell {
		aspect-ratio: 1;
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-primary);
		transition: all var(--transition-fast);
		border: 2px solid transparent;
	}
	
	.heatmap-cell.active {
		border-color: rgba(0, 0, 0, 0.1);
	}
	
	.heatmap-cell.complete {
		animation: pulse-glow 2s ease-in-out infinite;
	}
	
	.day-number {
		opacity: 0.7;
	}
	
	.heatmap-legend {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
	
	.legend-colors {
		display: flex;
		gap: 4px;
	}
	
	.legend-color {
		width: 20px;
		height: 20px;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.impact-summary {
		margin-bottom: var(--space-xl);
	}
	
	.impact-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	
	.impact-text {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-text-primary);
		margin: 0;
	}
	
	.impact-text strong {
		color: var(--color-progress-75);
		font-weight: 700;
	}
</style>