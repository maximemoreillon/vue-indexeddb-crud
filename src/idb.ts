import Dexie, { Table } from 'dexie'
import Item from '@/types/item'

const DB_NAME = 'itemdb';
const DB_VERSION = 1;
const STORES = {
    items: '++_id'
}

export class SubClassedDexie extends Dexie {
    items!: Table<Item> // Used for type definition
    constructor(dbName: string) {
        super(dbName)
    }
}


export const db = new SubClassedDexie(DB_NAME)

db.version(DB_VERSION).stores(STORES)