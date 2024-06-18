import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const putTransaction = db.transaction("jate", "readwrite");
  const store = putTransaction.objectStore("jate");
  const updatedContent = { id: 1, content };
  const result = await store.put(updatedContent);
  console.log("putDb result:", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const getTransaction = db.transaction("jate", "readonly");
  const store = getTransaction.objectStore("jate");
  const result = await store.get(1);
  return result ? result.content : null;
};

initdb();
