<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title>Items</v-toolbar-title>
            <v-spacer/>
            <NewItemDialog @itemCreated="getItems()"/>
        </v-toolbar>
        <v-divider />
        <v-card-text>
            <v-table :loading="loading">
                <thead>
                    <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item._id">
                        <td>{{ item._id || 'Missing ID'}}</td>
                        <td>
                            <RouterLink :to="{name: 'item', params: {_id: item._id}}">
                                {{ item.name || 'Missing name'}}
                            </RouterLink>
                        </td>
                        <td>{{ item.description || 'Missing description'}}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

import NewItemDialog from '@/components/NewItemDialog.vue'

import { ref, onMounted} from 'vue'
import { db } from '@/idb'

import Item from '@/types/item'

const items = ref<Item[]>([])
const loading = ref<boolean>(false)

const getItems = async () => {
    
    loading.value = true
    try {
        items.value = await db.items.toArray()
    } catch (error) {
        console.error(error)
        alert('Failed to query intems')
    } finally {
        loading.value = false
    }
}

onMounted( () => {
    getItems()
})

</script>