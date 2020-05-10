import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Item, List} from 'shared';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const name is resource URL
    const item: Item[] = [
      {id: 11, iName: 'Item 11', lId: 1, liked: true},
      {id: 12, iName: 'Item 12', lId: 1, liked: true},
      {id: 13, iName: 'Item 13', lId: 1, liked: false},
      {id: 14, iName: 'Item 14', lId: 1, liked: true},
      {id: 15, iName: 'Item 15', lId: 2, liked: true},
      {id: 16, iName: 'Item 16', lId: 2, liked: false},
      {id: 17, iName: 'Item 17', lId: 2, liked: true},
      {id: 18, iName: 'Item 18', lId: 3, liked: false},
      {id: 19, iName: 'Item 19', lId: 3, liked: false},
      {id: 20, iName: 'Item 20', lId: 3, liked: true}
    ];
    // const name is resource URL
    const list: List[] = [
      {id: 1, lName: 'List 1'},
      {id: 2, lName: 'List 2'},
      {id: 3, lName: 'List 3'}
    ];
    return {item, list};
  }

  // Overrides the genId method to ensure that a entity always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Item[]): number {
    return items.length > 0
      ? Math.max(...items.map(item => item.id)) + 1
      : 11;
  }
}
