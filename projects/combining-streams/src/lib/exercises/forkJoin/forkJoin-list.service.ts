import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Item, List} from "shared";

interface ListServiceState {
  lists: List[];
  items: Item[];
  loading: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForkJoinListService {

  constructor() {

  }

  httpGetItems = (arg?: any): Observable<{ items: Item[] }> =>
      of(getItems(arg)).pipe(
          // tslint:disable-next-line:no-bitwise
          delay(~~(Math.random() * 5000)),
          map(items => ({ items }))
      );

  httpGetLists = (arg?: any): Observable<{ lists: List[] }> =>
    of(getLists(arg)).pipe(
      // tslint:disable-next-line:no-bitwise
      delay(~~(Math.random() * 5000)),
      map(lists => ({ lists }))
    );
}

export function getLists(cfg = { num: 5 }): List[] {
  // tslint:disable-next-line:no-bitwise
  const randId = (s: string = '') => s + ~~(Math.random() * 100);
  return new Array(cfg.num).fill(cfg.num).map(_ => ({
    lId: randId('lid'),
    lName: randId('lname')
  }));
}


export function getItems(cfg = { num: 5 }): Item[] {
  // tslint:disable-next-line:no-bitwise
  const randId = (s: string = '') => s + ~~(Math.random() * 100);
  return new Array(cfg.num).fill(cfg.num).map(_ => ({
    iId: randId('iid'),
    iName: randId('iname'),
    lId:  randId('lid')
  }));
}
