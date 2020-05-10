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
  private baseUrl = 'api';
  private itemUrl = [this.baseUrl, 'item'].join('/');
  private listUrl = [this.baseUrl, 'list'].join('/');

  private state$ = new BehaviorSubject<Partial<ListServiceState>>({
    lists: [],
    items: [],
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

  httpGetItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl).pipe(
      catchError(e => of([] as Item[]))
    );
  }

  httpGetLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listUrl).pipe(
    );
  }

  refetchLists() {
    this.state$.next({ ...this.state$.getValue(), loading: false });
    this.httpGetLists()
        //.pipe(catchError(e => of({ error: e, loading: false, lists: [] })))
        .subscribe(lists => {
          return this.state$.next({
            error: '',
            lists: [...this.state$.value.lists, ...lists],
            loading: false
          });
        });
  }

  refetchItems() {
    this.state$.next({ ...this.state$.getValue(), loading: false });
    this.httpGetItems()
     //   .pipe(catchError(e => of({ error: e, loading: false, items: [] })))
        .subscribe(items => {
          return this.state$.next({
            error: '',
            items: [...this.state$.value.items, ...items],
            loading: false
          });
        });
  }
}

