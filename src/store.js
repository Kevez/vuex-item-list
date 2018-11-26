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
	mutations: {
		LOGIN: (state, payload) => {
			state.user = {
				isLoggedIn: true,
				name: payload.username,
				level: payload.username === 'admin' ? 2 : 1
			}

			id = state.items.length + 1;
		},
		LOGOUT: (state) => {
			state.user = {
				isLoggedIn: false,
				name: ''
			}
		},
		SHOW_FORM: (state, payload) => {
		},
		DISMISS_MODAL: (state) => {
		},
		ADD_ITEM: (state, payload) => {
			state.items.push({
				id: id,
				name: payload.name,
				parent: payload.parentToAddTo
			});

			id++;
		},
		EDIT_ITEM: (state, payload) => {
			var item = state.items.filter((item) => {
				return item.id ===  payload.id;
			})[0];

			item.name = payload.name;
		},
		REMOVE_ITEM: (state, id) => {
			var item = state.items.filter((item) => {
				return item.id === id;
			})[0];

			state.items.splice(state.items.indexOf(item), 1);
		}
	},
	actions: {
		login(context, payload) {
			context.commit('LOGIN', payload);
		},
		logout(context, payload) {
			context.commit('LOGOUT', payload);
		},
		showForm(context, payload) {
			context.commit('SHOW_FORM', payload);
		},
		dismissModal(context) {
			context.commit('DISMISS_MODAL');
		},
		addItem(context, payload) {
			context.commit('ADD_ITEM', payload);
		},
		editItem(context, payload) {
			context.commit('EDIT_ITEM', payload);
		},
		removeItem(context, payload) {
			context.commit('REMOVE_ITEM', payload);
		}
	}
})
