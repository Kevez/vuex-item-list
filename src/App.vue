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
                          :depth="0"/>
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
		}
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
