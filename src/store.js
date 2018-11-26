import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var id;

export default new Vuex.Store({
	state: {
		user: {
			isLoggedIn: false,
			name: '',
			level: 1
		},
		items: [
			{id: 1, parent: 0, name: 'Default item 1'},
			{id: 2, parent: 0, name: 'Default item 2'},
			{id: 3, parent: 0, name: 'Default item 3'},
			{id: 4, parent: 0, name: 'Default item 4'},
			{id: 5, parent: 0, name: 'Default item 5'}
		],
	},
	mutations: {},
	actions: {}
})
