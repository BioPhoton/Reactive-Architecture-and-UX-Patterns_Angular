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
        lName: list.lName
      })
    }
  );
}

export function upsertEntities<T>(oldEntities: T[], newLists: T[], id: string): T[] {
  const insertLists = newLists.filter(nL => !oldEntities.find(oL => oL[id] === nL[id]))
  const updateLists = newLists.filter(nL => oldEntities.find(oL => oL[id] === nL[id]))

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

