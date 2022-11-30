<template>
    <v-dialog v-model="dialog" max-width="30rem">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" icon="mdi-plus"/>
        </template>

        <v-card title="New item">
            <v-form @submit.prevent="createItemInIDB()">
            
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="Name"
                                v-model="newItem.name"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field 
                                label="Description" 
                                v-model="newItem.description"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                    <v-btn color="primary" type="submit" :loading="loading">Create item</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { createItem } from '@/idb';
const dialog = ref(false)
const loading = ref(false)

const newItem = reactive({
    name: '',
    description: ''
})

const emit = defineEmits(['itemCreated'])


const createItemInIDB = async () => {
    loading.value = true
    try {
        await createItem({...newItem})
        emit('itemCreated')
        dialog.value = false

    } catch (error) {
        console.error(error)
        alert('Failed to create item')
    } finally {
        loading.value = false
    }
}

</script>