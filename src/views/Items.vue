<template>
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title>Items</v-toolbar-title>
            <v-spacer/>
            <NewItemDialog @itemCreated="getItemsFromIDB()"/>
        </v-toolbar>
        <v-divider></v-divider>
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
import NewItemDialog from '@/components/NewItemDialog.vue';
import { ref, onMounted} from 'vue';
import Item from '@/types/item'
import { getItems } from '@/idb'

const items = ref<Item[]>([])
const loading = ref<boolean>(false)

const getItemsFromIDB = async () => {
    
    loading.value = true
    try {
        items.value = await getItems()
    } catch (error) {
        
    } finally {
        loading.value = false
    }
}

onMounted( () => {
    getItemsFromIDB()
})

</script>