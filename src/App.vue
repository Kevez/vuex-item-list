<template>
    <div id="app">
        <div v-if="!user.isLoggedIn">
            <Login/>
        </div>
        <div v-else="user.isLoggedIn">
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'app',
		components: {
		},
        computed: mapState([
			'user',
			'items',
		])
	}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
