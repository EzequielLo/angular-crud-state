import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post';
import { PostDTO } from '../model/post-dto';
import { PostProxyService } from './post-proxy-service.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private proxy: PostProxyService) { }

  getPosts(): Observable<Post[]> {
    return this.proxy.getAll$().pipe(
      map(postsDTO => {
        let posts: Post[] = [];
        postsDTO.map(postDTO => {
          posts = [...posts, this.adaptDTOToModel(postDTO)];
        });
        return posts;
      })
    );
  }

  getPost(postId: number): Observable<Post> {
    return this.proxy.get$(postId).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );

  }

  createPost(post: Post): Observable<Post> {
    return this.proxy.post$(this.adaptModelTODTO(post)).pipe(
      map((postResult: PostDTO) => {
        return {
          postResult,
          ...post
        };
      })
    );
  }

  deletePost(postId: number): Observable<Post> {
    return this.proxy.delete$(postId).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );
  }

  updatePost(postId: number, post: Post): Observable<Post> {
    return this.proxy.patch$(postId, this.adaptModelTODTO(post)).pipe(
      map(postDTO => this.adaptDTOToModel(postDTO))
    );
  }

  private adaptDTOToModel(postDTO: PostDTO): Post {
    return {
      postId: postDTO.id,
      heading: postDTO.title,
      content: postDTO.body
    };
  }

  private adaptModelTODTO(post: Post): PostDTO {
    return {
      id: post.postId,
      title: post.heading,
      body: post.content,
      userId: undefined,

    };
  }
}
