<template>
    <div class="recently-updated">
        {{message}}
    </div>
</template>

<script>
	export default {
		name: 'RecentlyUpdated',
        props: ['message'],
	}
</script>

<style scoped>
    .recently-updated {
        background: #c5f5c5;
        margin-bottom: 1rem;
        padding: 1rem;
    }
</style>
