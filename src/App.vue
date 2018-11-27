<template>
    <div id="app">
        <div v-if="!user.isLoggedIn">
            <Login/>
        </div>
        <div v-else-if="user.isLoggedIn">
            <Authenticated/>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex';
	import Authenticated from './components/Authenticated';
	import Login from './components/Login';

	export default {
		name: 'app',
		components: {
			Authenticated,
			Login,
		},
		computed: mapState([
			'user'
		]),
		mounted() {
			this.$options.sockets.refreshItemList = (payload) => {
				this.$store.dispatch('refreshItemListFromSocket', payload);
			};
		}
	}
</script>

<style>
    * {
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
    }

    body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        position: relative;
        height: 100%;
    }

    h2, h3 {
        color: #000;
    }

    h4 {
        color: #000;
        border-bottom: 1px solid #c1c1c1;
        width: 100%;
        padding-left: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    input {
        border: none;
        font-size: 1rem;
        outline: none;
        padding: 0.75rem;
        width: 80%;
        border-bottom: 1px solid #9e9e9e;
        margin-bottom: 1rem;
        text-align: center;
    }

    button {
        background-color: #ee6e73;
        border: none;
        width: 260px;
        height: 70px;
        padding: 0;
        line-height: 70px;
        font-size: 18px;
        font-weight: 400;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.5rem;
    }

    a {
        color: #ccc;
        text-decoration: none;
    }
</style>
