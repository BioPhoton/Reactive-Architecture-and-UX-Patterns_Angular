import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, concat, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Item, List, upsertEntities} from "shared";

interface ListServiceState {
  lists: List[];
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class StartHttpV1Service {
  private readonly baseUrl = 'api';
  private readonly itemUrl = [this.baseUrl, 'item'].join('/');
  private readonly listUrl = [this.baseUrl, 'list'].join('/');

  private readonly state$ = new BehaviorSubject<ListServiceState>({
    lists: [] as List[],
    items: [] as Item[]
  });

  lists$ = this.state$.pipe(map(s => s.lists));
  items$ = this.state$.pipe(map(s => s.items));

  constructor(private http: HttpClient) {

  }

  httpGetLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listUrl).pipe(
      catchError(() => of([] as List[]))
    );
  }

  httpPostItems(item: Pick<Item, 'iName' | 'lId'>): Observable<Item[]> {
    return this.http.post<Item[]>(this.itemUrl, item);
  }

  addItems(item: Pick<Item, 'iName' | 'lId'>) {
    throw new Error('not implemented');
  }

  httpGetItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl).pipe(
      catchError(() => of([] as Item[]))
    );
  }

}
