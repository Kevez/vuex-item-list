<template>
    <div class="authenticated">
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
        <Form v-if="showForm"></Form>
    </div>
</template>

<script>
	import {mapState} from 'vuex';
	import Form from './Form';
	import ItemList from './ItemList';
	import RecentlyUpdated from './RecentlyUpdated';
	import WelcomeMessage from './WelcomeMessage';

	export default {
		name: 'Authenticated',
		components: {
			Form,
			ItemList,
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
                'showForm'
			])
		},
		methods: {
			informUsersOfChange(message) {
				this.recentlyUpdated = message;
			}
		},
        mounted() {
            this.$store.dispatch('refreshItemList');

			this.$options.sockets.itemUpdated = (message) => {
				this.informUsersOfChange(message);
			};
        }
	}
</script>

<style scoped>
    .item-list {
        padding-left: 1rem;
        line-height: 1.8rem;
    }
</style>
