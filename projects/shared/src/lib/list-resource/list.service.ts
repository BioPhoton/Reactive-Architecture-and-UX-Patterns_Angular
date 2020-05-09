import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  map
} from 'rxjs/operators';
import {Item, List} from "./models";

interface ListServiceState {
  lists: List[];
  items: Item[];
  loading: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private state$ = new BehaviorSubject<Partial<ListServiceState>>({
    lists: [],
    loading: false,
    error: ''
  });

  lists$ = this.state$.pipe(
    map(s => s.lists),
    distinctUntilChanged()
  );
  items$ = this.state$.pipe(
      map(s => s.items),
      distinctUntilChanged()
  );

  constructor(private http: HttpClient) {
    this.state$.subscribe(console.log);
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


  refetchLists() {
    this.state$.next({ ...this.state$.getValue(), loading: false });
    this.httpGetLists({ num: 1 })
        .pipe(catchError(e => of({ error: e, loading: false, lists: [] })))
        .subscribe(slice => {
          return this.state$.next({
            error: '',
            lists: [...this.state$.value.lists, ...slice.lists],
            loading: false
          });
        });
  }

  refetchItems() {
    this.state$.next({ ...this.state$.getValue(), loading: false });
    this.httpGetItems({ num: 1 })
        .pipe(catchError(e => of({ error: e, loading: false, items: [] })))
        .subscribe(slice => {
          return this.state$.next({
            error: '',
            items: [...this.state$.value.lists, ...slice.items],
            loading: false
          });
        });
  }
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
