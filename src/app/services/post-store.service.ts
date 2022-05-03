import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../model/post';
import { Store } from '../store/store';
import { PostServiceService } from './post-service.service';

@Injectable({
  providedIn: 'root'
})

export class PostStoreService extends Store<Post[]> {

  constructor(private service: PostServiceService) {
    super();
  }

  async init() {
    if (this.get()) { return }
    return await lastValueFrom(this.service.getPosts().pipe(
      tap(this.store)
    ))

  }
  async create(post: Post): Promise<Post> {
    return await lastValueFrom(this.service.createPost(post).pipe(
      tap(postResult => {
        this.store([postResult, ...this.get()]);
      })
    ))
  }

  async update(postId: number, post: Post): Promise<Post> {
    return await lastValueFrom(this.service.updatePost(postId, post).pipe(
      tap(() => {
        const posts = this.get();
        const p = Object.assign({}, post);
        const index = this.searchIndex(posts, postId);
        const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
        this.store(newPosts);
      })
    ))
  }

  async delete(postId: number): Promise<Post> {
    return await lastValueFrom(this.service.deletePost(postId).pipe(
      tap(() => {
        const posts = this.get();
        const newPosts = posts.filter(post => post.postId !== postId);
        this.store(newPosts);
      })
    ))
  }

  private searchIndex(posts: Post[], postId: number): number {
    return posts.findIndex(item => item.postId === postId);
  }
}
