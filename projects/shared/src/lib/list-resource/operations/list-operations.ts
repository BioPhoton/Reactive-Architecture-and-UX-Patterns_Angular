import { BlogPost, Comment, Post } from '../models';

export function toBlogPosts(posts: Post[], comments: Comment[]): BlogPost[] {
  return posts.map(({ id, title}) => {
    const cmts = comments.filter(comment => comment.postId === id);
    return {
      id,
      title,
      comments: [
        ...cmts
      ],
      commentCount: cmts.length
    };
  });
}

export function upsertEntities<T>(oldEntities: T[], newEntities: T[], id: keyof T): T[] {
  const insertLists = newEntities.filter(nL => !oldEntities.find(oL => oL[id] === nL[id]));
  const updateLists = newEntities.filter(nL => oldEntities.find(oL => oL[id] === nL[id]));

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

