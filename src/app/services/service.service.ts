import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'users';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    console.log('Init Start');

    await this.storage.create();

    console.log('init complete the task');
  }

  async getAllData() {
    const values = await this.storage.get(STORAGE_KEY);
    return values || [];
  }

  async addData(item: any) {
    const storedData = (await this.storage.get(STORAGE_KEY)) || [];

    storedData.push(item);
    console.log('Data Added');
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async updateData(updatedItem: any) {
    const collection = await this.getAllData();

    // find the item in the collection and update it
    const index = collection.findIndex(
      (item: any) => parseInt(item.id) === parseInt(updatedItem.id)
    );
    if (index !== -1) {
      collection[index] = updatedItem;
      await this.storage.set(STORAGE_KEY, collection);
    }
  }
  async deleteAll() {
    console.log('log from delete ALL');

    return this.storage.clear();
  }
  async deleteOne(id: any) {
    console.log('log from deleteOne');
    const collection = await this.getAllData();

    //find the item in the collection and remove it

    const items = collection.filter(
      (item: any) => parseInt(item?.id) !== parseInt(id)
    );

    console.log('generated items', items);

    await this.storage.set(STORAGE_KEY, items);

    console.log('delete complete');
  }
}
