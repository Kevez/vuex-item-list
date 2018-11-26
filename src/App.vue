<template>
    <div id="app">
        <div v-if="!user.isLoggedIn">
            <Login/>
        </div>
        <div v-else="user.isLoggedIn">
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

	export default {
		name: 'app',
		components: {
			ItemList
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
