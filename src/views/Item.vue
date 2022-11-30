<template>
    <v-card>
        <v-toolbar flat>
            <v-btn icon="mdi-arrow-left" :to="{name: 'items'}" />
            <v-toolbar-title>Item {{ itemId }}</v-toolbar-title>
            <v-spacer />
            <v-btn icon="mdi-content-save" @click="updateItemInIDB()"/>
            <v-btn color="#c00000" icon="mdi-delete" @click="deleteItemFromIDB"/>
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
import Item from '@/types/item'
import { getItem } from '@/idb'

const route = useRoute()
const router = useRouter()

const itemId = computed(() => route.params._id )
const item = ref<Item | undefined>(undefined)

onMounted( () => {
    getItemFromIDB()
})

const getItemFromIDB = async () => {
    const item = await getItem(itemId.value)
    console.log(item)
}

const updateItemInIDB = async () => {
    console.warn('not implemented')
}

const deleteItemFromIDB = async () => {
    alert('not implemented')
}


</script>