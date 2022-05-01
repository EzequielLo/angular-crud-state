import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post';
import { PostStoreService } from 'src/app/services/post-store.service';

@Component({
  selector: 'app-app-crud-post',
  templateUrl: './app-crud-post.component.html',
  styleUrls: ['./app-crud-post.component.css']
})
export class AppCrudPostComponent implements OnInit {


  posts$!: Observable<Post[]>;
  formPost!: FormGroup;
  action = '';

  constructor(
    private store: PostStoreService
  ) { }

  ngOnInit() {
    this.store.init();
    this.posts$ = this.store.get$();
    this.formPost = new FormGroup({
      postId: new FormControl(['']),
      heading: new FormControl('', [Validators.required]),
      content: new FormControl([''])
    });
  }

  async onDelete(post: Post) {
    await this.store.delete(post.postId);
  }

  async onCreate() {
    const heading = this.formPost.get('heading')!.value;
    const content = this.formPost.get('content')!.value;
    const post: Post = {
      heading: heading,
      content: content,
      postId: 0
    };
    await this.store.create(post);
  }

  onSelect(post: Post) {
    this.formPost.get('postId')!.setValue(post.postId);
    this.formPost.get('heading')!.setValue(post.heading);
    this.formPost.get('content')!.setValue(post.content);
    this.action = 'update';
  }

  async onUpdate() {
    const postId = this.formPost.get('postId')!.value;
    const heading = this.formPost.get('heading')!.value;
    const content = this.formPost.get('content')!.value;
    const post = {
      postId, heading, content
    };
    await this.store.update(postId, post);
  }

  onCancel() {
    this.formPost.get('heading')!.setValue('');
    this.formPost.get('content')!.setValue('');
    this.action = '';
  }
}

