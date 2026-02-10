<script>
	import { togglePrayer } from '../stores/appStore.js';
	
	export let prayerName;
	export let checked = false;
	export let label;
	export let disabled = false;
	
	async function handleToggle() {
		if (!disabled) {
			await togglePrayer(prayerName);
		}
	}
</script>

<button
	class="prayer-checkbox"
	class:checked
	class:disabled
	on:click={handleToggle}
	aria-label={label}
>
	<div class="checkbox-icon">
		{#if checked}
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path
					d="M7 10L9 12L13 8"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
	</div>
	<span class="prayer-label">{label}</span>
</button>

<style>
	.prayer-checkbox {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		min-height: 52px;
		width: 100%;
		font-family: var(--font-ui);
	}
	
	.prayer-checkbox:hover:not(.disabled) {
		border-color: var(--color-progress-50);
		background: var(--color-bg-card);
	}
	
	.prayer-checkbox:active:not(.disabled) {
		transform: scale(0.98);
	}
	
	.prayer-checkbox.checked {
		background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
		border-color: var(--color-progress-75);
	}
	
	.prayer-checkbox.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	.checkbox-icon {
		width: 28px;
		height: 28px;
		border-radius: var(--radius-sm);
		background: white;
		border: 2px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}
	
	.checked .checkbox-icon {
		background: var(--color-progress-75);
		border-color: var(--color-progress-75);
		color: white;
	}
	
	.prayer-label {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-align: left;
		flex: 1;
	}
</style>