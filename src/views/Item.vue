<template>
    <v-card :loading="loading">
        <v-toolbar flat>
            <v-btn icon="mdi-arrow-left" :to="{name: 'items'}" />
            <v-toolbar-title>Item {{ itemId }}</v-toolbar-title>
            <v-spacer />
            <v-btn icon="mdi-content-save" @click="updateItem()" :loading="updating"/>
            <v-btn color="#c00000" icon="mdi-delete" @click="deleteItem" :loading="deleting"/>
        </v-toolbar>
        <v-card-text v-if="item">
            <v-row>
                <v-col>
                    <v-text-field label="Name" v-model="item.name" ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Description" v-model="item.description"></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

import { ref, computed, onMounted} from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { db } from '@/idb'
import Item from '@/types/item'

const route = useRoute()
const router = useRouter()

const itemId = computed(() => Array.isArray(route.params._id) ? route.params._id[0] : route.params._id )
const item = ref<Item | undefined>(undefined)

const loading = ref<boolean>(false)
const updating = ref<boolean>(false)
const deleting = ref<boolean>(false)


onMounted( () => {
    getItem()
})

const getItem = async () => {
    
    loading.value = true
    try {
        const query = { _id: Number(itemId.value)}
        item.value = await db.items
            .where(query)
            .first()
    } catch (error) {
        alert('Update failed')
        console.error(error)
    } finally {
        loading.value = false
    }
}

const updateItem = async () => {
    if (!item.value) return

    updating.value = true
    try {
        await db.items.put({...item.value})
        alert('Update successful')
    } catch (error) {
        alert('Update failed')
        console.error(error)

    } finally {
        updating.value = false
    }
}

const deleteItem = async () => {
    
    deleting.value = true
    try {
        await db.items.delete(Number(itemId.value))
        router.push({ name: 'items' })
    } catch (error) {
        alert('Update failed')
        console.error(error)
    } finally {
        deleting.value = false
    }
}


</script>