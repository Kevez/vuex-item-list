<template>
    <div id="app">
        <div v-if="!user.isLoggedIn">
            <Login/>
        </div>
        <div v-else-if="user.isLoggedIn">
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
    </div>
</template>

<script>
	import {mapState} from 'vuex';
	import Form from './components/Form';
	import ItemList from './components/ItemList';
	import Login from './components/Login';
	import RecentlyUpdated from './components/RecentlyUpdated';
	import WelcomeMessage from './components/WelcomeMessage';

	export default {
		name: 'app',
		components: {
			Form,
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
				'showForm'
			])
		},
		methods: {
			informUsersOfChange(message) {
				this.recentlyUpdated = message;
			}
		},
		mounted() {
			this.$options.sockets.addItem = (data) => {
				this.$store.dispatch('addItem', data);
			};

			this.$options.sockets.editItem = (data) => {
				this.$store.dispatch('editItem', data);
			};

			this.$options.sockets.removeItem = (data) => {
				this.$store.dispatch('removeItem', data);
			};

			this.$options.sockets.itemUpdated = (data) => {
				var message = '';
				switch (data.type) {
					case 'add':
						message = `${data.payload.name} was added`;
						break;
					case 'edit':
						message = `${data.payload.prevName} was updated to ${data.payload.name}`;
						break;
					case 'remove':
						message = `Item was removed`;
						break;
				}

				this.informUsersOfChange(message);
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
        margin: 4px;
        padding: 0;
        line-height: 70px;
        font-size: 18px;
        font-weight: 400;
    }

    a {
        color: #ccc;
        text-decoration: none;
    }

    .item-list {
        padding-left: 1rem;
        line-height: 1.8rem;
    }
</style>
