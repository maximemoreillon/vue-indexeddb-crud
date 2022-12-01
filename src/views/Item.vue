<template>
    <v-card :loading="loading">
        <v-toolbar flat>
            <v-btn icon="mdi-arrow-left" :to="{name: 'items'}" />
            <v-toolbar-title>Item {{ itemId }}</v-toolbar-title>
            <v-spacer />
            <v-btn icon="mdi-content-save" @click="updateItemInIDB()" :loading="updating"/>
            <v-btn color="#c00000" icon="mdi-delete" @click="deleteItemFromIDB" :loading="deleting"/>
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
import { getItem, deleteItem, updateItem } from '@/idb'
import Item from '@/types/item'

const route = useRoute()
const router = useRouter()

const itemId = computed(() => Array.isArray(route.params._id) ? route.params._id[0] : route.params._id )
const item = ref<Item | undefined>(undefined)

const loading = ref<boolean>(false)
const updating = ref<boolean>(false)
const deleting = ref<boolean>(false)


onMounted( () => {
    getItemFromIDB()
})

const getItemFromIDB = async () => {
    
    loading.value = true
    try {
        item.value = await getItem(itemId.value)
    } catch (error) {

    } finally {
        loading.value = false
    }
}

const updateItemInIDB = async () => {
    if (!item.value) return

    updating.value = true
    try {
        await updateItem({ ...item.value })
    } catch (error) {

    } finally {
        updating.value = false
    }
}

const deleteItemFromIDB = async () => {
    
    deleting.value = true
    try {
        await deleteItem(itemId.value)
        router.push({ name: 'items' })
    } catch (error) {

    } finally {
        deleting.value = false
    }
}


</script>