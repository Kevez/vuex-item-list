import VueSocketIO from 'vue-socket.io';
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueSocketIO, 'http://localhost:7777');

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
