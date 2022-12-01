/*
References:

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs

*/

const DB_NAME = 'itemdb';
const DB_VERSION = 1;
const OBJECTSTORE_NAME = 'items'
const KEYPATH = '_id'

import Item from '@/types/item'

// Not elegant
let db :any

const getDb = async () => new Promise((resolve, reject) => {

    // if already db open, just use it
    if (db) { return resolve(db); }


    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
    };

    request.onsuccess = () => {
        db = request.result;
        resolve(db);
    };

    request.onupgradeneeded =  () => {
        console.log('onupgradeneeded');
        let db = request.result;

        // Creating the object store
        const store = db.createObjectStore(OBJECTSTORE_NAME, { autoIncrement: true, keyPath: KEYPATH });
        store.createIndex(KEYPATH, KEYPATH)
    }

})

export const createItem = async (newItem: Item) => {

    // TODO: find type
    const db:any = await getDb();

    return new Promise(resolve => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readwrite')

        transaction.oncomplete = resolve

        const store = transaction.objectStore(OBJECTSTORE_NAME);
        store.put(newItem);

    });

}

export const getItems = async () => {

    // TODO: find type
    const db:any = await getDb();

    return new Promise<[Item] | []>(resolve => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readonly')

        transaction.oncomplete = () => {
            resolve(items);
        }

        // Otherwise: const request = store.getAll();


        let store = transaction.objectStore(OBJECTSTORE_NAME);
        const items: any = [];

        store.openCursor().onsuccess = (e: any) => {
            let cursor = e.target.result;
            if (cursor) {
                items.push(cursor.value)
                cursor.continue();
            }
        }

    })
}

export const getItem = async (_id:string) => {

    // Not working yet

    // TODO: find type
    const db: any = await getDb();

    return new Promise<Item>((resolve, reject) => {

        const transaction = db.transaction(OBJECTSTORE_NAME, 'readonly');
        transaction.oncomplete = resolve

        const store = transaction.objectStore(OBJECTSTORE_NAME)

        const request = store.get(Number(_id))

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = reject;

        
    });
}

    




// TODO: Update


export const deleteItem = async (itemId: string) => {

    // TODO: find type
    const db: any = await getDb();

    return new Promise(resolve => {

        let trans = db.transaction(['items'], 'readwrite');
        trans.oncomplete = resolve

        let store = trans.objectStore('items');
        store.delete(itemId);
    });
}

