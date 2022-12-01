/*
References:

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
https://web.dev/indexeddb/

*/


/*

## Todo:

* [ ] try return transaction.complete


*/


const DB_NAME = 'itemdb';
const DB_VERSION = 1;
const OBJECTSTORE_NAME = 'items'
const KEYPATH = '_id'

import Item from '@/types/item'

// Not elegant
let db: IDBDatabase

const getDb = async () => new Promise < IDBDatabase >((resolve, reject) => {

    // if already db open, just use it
    if (db) { return resolve(db); }


    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = reject

    request.onsuccess = () => {
        db = request.result;
        resolve(db);
    };

    request.onupgradeneeded =  () => {
        console.log('onupgradeneeded')
        const db = request.result
        const store = db.createObjectStore(OBJECTSTORE_NAME, { autoIncrement: true, keyPath: KEYPATH })
        store.createIndex(KEYPATH, KEYPATH)
    }

})

export const createItem = async (newItem: Item) => {

    const db = await getDb();

    return new Promise(resolve => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readwrite')

        transaction.oncomplete = resolve

        const store = transaction.objectStore(OBJECTSTORE_NAME);
        // Note: store.put can be used instead
        store.add(newItem)

    });

}

export const getItems = async () => {

    const db = await getDb();

    return new Promise<Item[]>((resolve, reject) => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readonly')
        const store = transaction.objectStore(OBJECTSTORE_NAME)

        const request = store.getAll()

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = reject;

    })
}

export const getItem = async (itemId:string) => {

    const db = await getDb();

    return new Promise<Item>((resolve, reject) => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readonly');
        const store = transaction.objectStore(OBJECTSTORE_NAME)

        const request = store.get(Number(itemId))

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = reject;

        
    });
}
    

export const updateItem = async(itemData: Item)  => {
    // Node: store.put will add item if the key is not matched

    const db = await getDb();

    return new Promise(resolve => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readwrite');
        transaction.oncomplete = resolve

        const store = transaction.objectStore(OBJECTSTORE_NAME);
        store.put(itemData);

    });

}

export const deleteItem = async (itemId: string) => {

    const db = await getDb()

    return new Promise(resolve => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readwrite');
        transaction.oncomplete = resolve

        const store = transaction.objectStore(OBJECTSTORE_NAME);
        store.delete(Number(itemId));
    });
}

