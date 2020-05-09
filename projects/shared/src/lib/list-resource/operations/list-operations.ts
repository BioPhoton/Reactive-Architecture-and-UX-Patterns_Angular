import {Item, List} from "../models";

export function mergeListsAndItems(leftArray: List[], rightArray: Item[]): Array<List & Item> {
    return leftArray.map(
        leftItem => ({
            ...rightArray.find(
                rightItem => leftItem['lId'] === rightItem['lId']
            ),
            ...leftItem
        })
    );
}