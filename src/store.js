import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const API_BASE_URL = 'http://localhost:7777';

export default new Vuex.Store({
	state: {
		user: {
			isLoggedIn: false,
			name: '',
			level: 1
		},
		items: [],
		showForm: false,
		formType: '',
		parentToAddTo: 0,
		currentlyEditingId: 0,
		currentlyEditingName: ''
	},
	mutations: {
		REFRESH_ITEM_LIST: (state, payload) => {
			state.items = payload;
		},
		LOGIN: (state, payload) => {
			state.user = {
				isLoggedIn: true,
				name: payload.username,
				level: payload.username === 'admin' ? 2 : 1
			}
		},
		LOGOUT: (state) => {
			state.user = {
				isLoggedIn: false,
				name: ''
			}
		},
		SHOW_FORM: (state, payload) => {
			state.currentlyEditingName = '';
			state.formType = payload.type;

			if (payload.type === 'add') {
				state.parentToAddTo = payload.id;
			} else {
				state.currentlyEditingId = payload.id;
				state.currentlyEditingName = payload.name;
			}

			state.showForm = true;
		},
		DISMISS_MODAL: (state) => {
			state.showForm = false;
		}
	},
	actions: {
		refreshItemList(context) {
			axios.get(`${API_BASE_URL}/items`).then((response) => {
				context.commit('REFRESH_ITEM_LIST', response.data);
			});
		},
		refreshItemListFromSocket(context, payload) {
			context.commit('REFRESH_ITEM_LIST', payload);
		},
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
			return axios.post(`${API_BASE_URL}/add-item`, {
				name: payload.name,
				parentToAddTo: payload.parentToAddTo
			}).then((response) => {
				context.commit('REFRESH_ITEM_LIST', response.data);
			});
		},
		editItem(context, payload) {
			return axios.post(`${API_BASE_URL}/update-item`, {
				id: payload.id,
				name: payload.name
			}).then((response) => {
				context.commit('REFRESH_ITEM_LIST', response.data);
			});
		},
		removeItem(context, itemId) {
			return axios.post(`${API_BASE_URL}/remove-item`, {
				id: itemId
			}).then((response) => {
				context.commit('REFRESH_ITEM_LIST', response.data);
			});
		}
	}
})
