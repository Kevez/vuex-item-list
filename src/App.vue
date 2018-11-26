<template>
    <div id="app">
        <div v-if="!user.isLoggedIn">
            <Login/>
        </div>
        <div v-else="user.isLoggedIn">
            <WelcomeMessage :username="user.name"/>
            <h4>Item List</h4>
            <RecentlyUpdated :message="recentlyUpdated" v-if="recentlyUpdated"/>
            <div class="item-list">
                <ItemList v-for="item in topLevelItems"
                          :key="item.id"
                          :item="item"
                          :items="items"
                          :depth="0"
                          :level="user.level"/>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex';
	import ItemList from './components/ItemList';
	import Login from './components/Login';
	import RecentlyUpdated from './components/RecentlyUpdated';
	import WelcomeMessage from './components/WelcomeMessage';

	export default {
		name: 'app',
		components: {
			ItemList,
			Login,
			RecentlyUpdated,
			WelcomeMessage
		},
		data() {
			return {
				recentlyUpdated: ''
			}
		},
		computed: {
			topLevelItems() {
				return this.items.filter((item) => {
					return item.parent === 0;
				});
			},
			...mapState([
				'user',
				'items',
			])
		},
		methods: {
			informUsersOfChange(message) {
				this.recentlyUpdated = message;
			}
		}
	}
</script>

<style>
    * {
        box-sizing: border-box;
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
        margin: 4px;
        padding: 0;
        line-height: 70px;
        font-size: 18px;
        font-weight: 400;
    }

    a {
        color: #ccc;
    }

    .item-list {
        padding-left: 1rem;
        line-height: 1.8rem;
    }
</style>
