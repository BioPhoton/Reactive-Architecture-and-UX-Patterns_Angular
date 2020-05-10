import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Item, List} from "shared";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ForkJoinListService {
  private baseUrl = 'api';
  private itemUrl = [this.baseUrl, 'item'].join('/');
  private listUrl = [this.baseUrl, 'list'].join('/');

  constructor(private http: HttpClient) {

  }

  httpGetItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl).pipe(
      catchError(e => of([] as Item[]))
    );
  }

  httpGetLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listUrl).pipe(
      catchError(e => of([] as List[]))
    );
  }

}

