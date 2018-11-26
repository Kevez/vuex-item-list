<template>
    <div class="welcome-message">
        Welcome back, {{username}} [<a href="#" @click="logout()">Logout</a>]
    </div>
</template>

<script>
	export default {
		name: 'WelcomeMessage',
        props: ['username'],
		methods: {
			login() {
				if (this.username.length === 0) {
					return;
				}

				this.$store.dispatch('login', {
					username: this.username
				});
			},
			logout() {
				this.$store.dispatch('logout');
			},
			checkKeyPress: function (e) {
				if (e.keyCode !== 13) {
					return;
				}

				this.login();
			}
		}
	}
</script>

<style scoped>
    .welcome-message {
        margin-top: 0;
        text-align: right;
        padding: 1rem;
        background: #0079bf;
        color: #fff;
    }
</style>
