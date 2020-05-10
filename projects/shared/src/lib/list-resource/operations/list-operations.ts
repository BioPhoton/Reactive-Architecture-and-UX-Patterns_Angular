import {Item, JoinedItem, List} from "../models";

export function mergeListsAndItems(lists: List[], items: Item[]): Array<JoinedItem> {
  return items.map(item => {
      const list = lists.find(
        list => list['id'] === item['lId']
      )
      return ({
        iId: item.id,
        iName: item.iName,
        lId: list.id,
        lName: list.lName,
        liked: item.liked
      })
    }
  );
}

export function upsertEntities<T>(oldEntities: T[], newEntities: T[], id: string): T[] {
  const insertLists = newEntities.filter(nL => !oldEntities.find(oL => oL[id] === nL[id]))
  const updateLists = newEntities.filter(nL => oldEntities.find(oL => oL[id] === nL[id]))

  return insertLists.concat(
    oldEntities.map(
      oldList => ({
        ...updateLists.find(
          nL => nL[id] === oldList[id]
        ),
        ...oldList
      })
    )
  )
}

