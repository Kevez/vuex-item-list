<template>
    <div class="category">
        <span :style="indent">{{item.name}}</span>
        <ItemList v-for="item in subItems"
                  :item="item"
                  :items="items"
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
		methods: {}
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
