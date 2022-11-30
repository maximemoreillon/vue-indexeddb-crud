import { createRouter, createWebHistory } from "vue-router";

import Items from '@/views/Items.vue'
import Item from '@/views/Item.vue'

const routes = [
    { name: 'items', path: '/items', alias: '/', component: Items },
    { name: 'item', path: '/items/:_id', alias: '/', component: Item },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router