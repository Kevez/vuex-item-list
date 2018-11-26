<template>
    <div class="form">
        <h2>Form</h2>
        <input v-on:keyup="checkKeyPress"
               v-model="itemName"/>
        <button @click="submitItem">{{buttonText}}</button>
        <button @click="dismiss">Dismiss</button>
    </div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: 'Form',
		data() {
			return {
				itemName: ''
			}
		},
		computed: {
			buttonText() {
				return this.formType === 'add' ? 'Add' : 'Edit';
			},
			...mapState([
				'parentToAddTo',
				'currentlyEditingId',
				'currentlyEditingName',
				'formType'
			])
		},
		methods: {
			submitItem() {
				if (this.itemName.length === 0) {
					return;
				}

				if (this.formType === 'add') {
					this.$store.dispatch('addItem', {
						name: this.itemName,
						parentToAddTo: this.parentToAddTo
					});
				} else {
					this.$store.dispatch('editItem', {
						id: this.currentlyEditingId,
						name: this.itemName,
						prevName: this.currentlyEditingName
					});
				}

				this.$store.dispatch('dismissModal');
			},
			checkKeyPress: function (e) {
				if (e.keyCode !== 13) {
					return;
				}

				this.submitItem();
			},
			dismiss() {
				this.$store.dispatch('dismissModal');
			}
		},
		created() {
			this.itemName = this.currentlyEditingName;
		}
	}
</script>

<style scoped>
    .form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300px;
        background: #bbb;
        color: #fff;
    }
</style>
