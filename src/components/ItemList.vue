<template>
    <div class="category">
        <span :style="indent">{{item.name}}</span>
        [<a href="#" class="add" @click="showAddForm(item.id)">+</a>]
        [<a href="#" class="edit" @click="showEditForm(item.id)">edit</a>]

        <span v-if="level > 1">
            [<a href="#" class="remove" @click="removeItem(item.id)">x</a>]
        </span>
        <ItemList v-for="item in subItems"
                  :item="item"
                  :items="items"
                  :key="item.id"
                  :depth="depth + 1"
                  :level="level"/>
    </div>
</template>

<script>
	export default {
		name: 'ItemList',
		props: ['item', 'items', 'depth', 'level'],
		computed: {
			subItems() {
				return this.items.filter((x) => {
					return x.parent === this.item.id;
				});
			},
			indent() {
				return {
					marginLeft: `${this.depth * 1.25}rem`
				}
			}
		},
		methods: {
			showAddForm(id) {
				this.$store.dispatch('showForm', {
					type: 'add',
					id: id
				});
			},
			showEditForm(id) {
				this.$store.dispatch('showForm', {
					type: 'edit',
					id: id,
					name: this.item.name
				});
			},
			removeItem(id) {
				this.$store.dispatch('removeItem', id);
				this.$socket.emit('removeItem', id);
			}
        }
	}
</script>

<style scoped>
    .category {
        text-align: left;
    }

    input {
        margin-bottom: 1rem;
    }

    a {
        display: inline-block;
        text-align: center;
    }

    a.add {
        color: green;
    }

    a.edit {
        color: orange;
    }

    a.remove {
        color: red;
    }
</style>
