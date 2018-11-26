<template>
    <div class="category">
        <span :style="indent">{{item.name}}</span>
        <ItemList v-for="item in subItems"
                  :item="item"
                  :items="items"/>
    </div>
</template>

<script>
	export default {
		name: 'ItemList',
		props: ['item', 'items'],
		computed: {
			subItems() {
				return this.items.filter((x) => {
					return x.parent === this.item.id;
				});
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
    .category {
        text-align: left;
    }

    a {
        display: inline-block;
        text-align: center;
        text-decoration: none;
    }
</style>
