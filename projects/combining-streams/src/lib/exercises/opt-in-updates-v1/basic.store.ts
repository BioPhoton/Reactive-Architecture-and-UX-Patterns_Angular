import {Injectable} from "@angular/core";
import {map, withLatestFrom} from "rxjs/operators";
import {Observable} from "rxjs";
import {RxState} from "@rx-angular/state";
import {Item, List} from "shared";


export interface BasicState {
    lists: List[];
    items: Item[];
}

@Injectable({providedIn: 'root'})
export class BasicStoreService extends RxState<BasicState> {
    initState() {
        this.set({
            items: [
                {iId: '1', iName: 'item1', lId: '1'},
                {iId: '2', iName: 'item2', lId: '1'},
                {iId: '3', iName: 'item3', lId: '2'}
            ],
            lists: [
                {lId: '1', lName: 'list1'},
                {lId: '2', lName: 'list2'}
            ]
        });
    }
    connectUpsertManyItems(entities$: Observable<Item[]>) {
        this.connect(
            entities$
                .pipe(
                    withLatestFrom(this.select('items')),
                    map(([entities, items]) => {
                        return {items: items.concat(entities)}
                    })
                )
        );
    }

    connectUpsertManyLists(entities$: Observable<List[]>) {
        this.connect(
            entities$
                .pipe(
                    withLatestFrom(this.select('lists')),
                    map(([entities, lists]) => {
                        return {lists: lists.concat(entities)}
                    })
                )
        );
    }

    constructor() {
        super();
        this.set({lists: [], items: []});
    }


}
