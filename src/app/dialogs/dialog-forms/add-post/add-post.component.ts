import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../../../models/Post';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../services/post/post.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  registerForm: FormGroup;
  newPost: Post;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {
    if (data[0] != null) {
      // edit
    } else {
      this.newPost = new Post();
    }
  }

  ngOnInit(): void {
    this.createFormGroup();
  }
  private createFormGroup() {
    const name: RegExp = /^[a-zA-Z\s]*$/;
    this.registerForm = this.formBuilder.group({
      postName: ['', [Validators.required,
        Validators.pattern(name),  Validators.minLength(3)], this.checkInUsePostName.bind(this)]
    });
  }
  get postName() {
    return this.registerForm.get('postName') as FormControl;
  }

  getErrorPostName() {
    return this.postName.hasError('required') ?
      'Post name required' :
      this.postName.hasError('minlength') ? 'You need to specify at least 3 characters' :
        this.postName.hasError('alreadyInUse') ? 'Post already exists' :
          'Post name should contain only characters';

  }
  checkInUsePostName(control) {
      // mimic http database access
      const posts = [];
      this.postService.list().subscribe(psts => {
        // console.log(psts);

        if (this.data[0] != null) {
          for (const p of psts) {
            if (p.postName !== this.data[0].postName) {
              posts.push(p.postName.toLowerCase());
            }
          }
        } else {
          for (const p of psts) {
              posts.push(p.postName.toLowerCase());
            }
        }
      });
      return new Observable(observer => {
        setTimeout(() => {
          const result = (posts.indexOf(control.value.toLowerCase()) !== -1) ? { alreadyInUse: true } : null;
          // console.log(result);
          observer.next(result);
          observer.complete();
        }, 500);
      });
  }
  closeThis() {
    this.dialogRef.close(false);
  }
  addPost() {
    this.postService.add(this.newPost).subscribe(() => {
      this.dialogRef.close(true);
    }, error => console.log(error));
  }
}
