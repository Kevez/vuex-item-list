<template>
    <div class="login-form">
        <h2>Dot Five Test</h2>
        <h3>Login</h3>
        <input v-on:keyup="checkKeyPress"
               v-model="username"
               autofocus/>
        <button @click="login">Login</button>
    </div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				username: ''
			}
		},
		methods: {
			login() {
				if (this.username.length === 0) {
					return;
				}

				this.$store.dispatch('login', {
					username: this.username
				});
			},
			checkKeyPress(e) {
				if (e.keyCode !== 13) {
					return;
				}

				this.login();
			}
		}
	}
</script>

<style scoped>
    .login-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300px;
        border: 1px solid rgba(0, 0, 0, 0.14);
        color: #fff;
    }
</style>
