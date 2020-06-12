import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Comment, Post} from 'shared';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const name is resource URL
    const comments: Comment[] = [
      {id: 11, text: 'Comment 11', postId: 1},
      {id: 12, text: 'Comment 12', postId: 1},
      {id: 13, text: 'Comment 13', postId: 1},
      {id: 14, text: 'Comment 14', postId: 1},
      {id: 15, text: 'Comment 15', postId: 2},
      {id: 16, text: 'Comment 16', postId: 2},
      {id: 17, text: 'Comment 17', postId: 2},
      {id: 18, text: 'Comment 18', postId: 3},
      {id: 19, text: 'Comment 19', postId: 3},
      {id: 20, text: 'Comment 20', postId: 3}
    ];
    // const name is resource URL
    const posts: Post[] = [
      {id: 1, title: 'Post 1', description: 'This is my first post!'},
      {id: 2, title: 'Post 2', description: 'Get fascination information in this post.'},
      {id: 3, title: 'Post 3', description: 'Learn how to get better and better in what you do!'},
      {id: 4, title: 'Post 4', description: '5 things you should know'}
    ];
    return {comment: comments, post: posts};
  }

  // Overrides the genId method to ensure that a entity always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Comment[]): number {
    return items.length > 0
      ? Math.max(...items.map(item => item.id)) + 1
      : 11;
  }
}
