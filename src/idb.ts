/*
References:

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs

*/

const DB_NAME = 'itemdb';
const DB_VERSION = 1;

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
        db.createObjectStore("items", { autoIncrement: true, keyPath: '_id' });
    }

})

export const createItem = async (newItem: Item) => {

    // TODO: find type
    const db:any = await getDb();

    return new Promise(resolve => {

        const transaction = db.transaction(['items'], 'readwrite')

        transaction.oncomplete = resolve

        const store = transaction.objectStore('items');
        store.put(newItem);

    });

}



    
export const deleteCat = async ( itemId: string ) => {

    // TODO: find type
    const db:any = await getDb();

    return new Promise(resolve => {

        let trans = db.transaction(['items'], 'readwrite');
        trans.oncomplete = resolve

        let store = trans.objectStore('items');
        store.delete(itemId);
    });
}

export const getItems = async () => {

    // TODO: find type
    const db:any = await getDb();

    return new Promise<[Item] | []>(resolve => {

        const transaction = db.transaction(['items'], 'readonly')

        transaction.oncomplete = () => {
            resolve(items);
        }

        let store = transaction.objectStore('items');
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


