import Dexie, { Table } from 'dexie'
import Item from '@/types/item'

const DB_NAME = 'itemdb';
const DB_VERSION = 1;
const STORES = {
    items: '++_id'
}



export class SubClassedDexie extends Dexie {
    items!: Table<Item> // Not sure what this syntax means

    constructor() {
        super(DB_NAME)
        this.version(DB_VERSION).stores(STORES)
    }
}


export const db = new SubClassedDexie()