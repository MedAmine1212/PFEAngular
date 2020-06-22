import { Component, OnInit } from '@angular/core';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {PostService} from '../../services/post/post.service';
import {Post} from '../../models/Post';
import set = Reflect.set;
import {Image} from '../employees/employees.component';
import {User} from '../../models/User';
import {ImageService} from '../../services/image/image.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../services/user/user.service';
import {AddUsersToPostComponent} from '../../sheets/add-users-to-post/add-users-to-post.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {AddPostComponent} from '../../dialogs/dialog-forms/add-post/add-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  showHideInput: boolean;
  searchText;
  images: Image[] = [];
  loading: boolean;
  posts: Post[];
  clickedPost: Post;
  users: User[];
  showHideInput2: boolean;
  searchText2;
  constructor(
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private userService: UserService,
    private imageService: ImageService,
    private postService: PostService,
    private themeChanger: ThemeChangerService
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }
reloadData() {
  this.loading = true;
  this.postService.list().subscribe(r => {
    this.posts = r;
    this.users = [];
    for (const p of this.posts) {
      if (this.clickedPost != null) {
        if (this.clickedPost.postId === p.postId) {
          this.clickedPost = p;
        }
      }
      for (const emp of p.users) {
        this.users.push(emp);
      }
    }
    this.getImages(this.users);
  }, error => console.log(error));
}
  getTheme() {
    return this.themeChanger.getTheme();
  }
  getImages(users: User[]) {
    const img: Image[] = [];
    for (const emp of users) {
      const imageName = emp.image;
      const image = null;
      img.push(new Image(imageName, image));
    }
    this.images = img;
    for (const emp of this.images) {
      this.imageService.load(emp.imageName).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        img  => {
          if (img != null ) {
            // @ts-ignore
            const base64Data = img.picByte;
            this.images.forEach(imageuser => {
              if (imageuser.imageName === emp.imageName) { imageuser.imageFile =  'data:image/jpeg;base64,' + base64Data; }
            });
          }
        });
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  showImage(name) {
    for (const img of this.images) {
      if (img.imageName === name) {
        return img.imageFile;
      }
    }
    return null;
  }

  setClickedPost(p) {
    this.loading = true;
    this.clickedPost = p;
    setTimeout(() => {
    this.loading = false;
    }, 600);
  }

  openBottomSheet() {
    this.bottomSheet.open(AddUsersToPostComponent , {
      data: this.clickedPost
    });
  }

  revokePost(emp: User) {
    emp.post = null;
    this.userService.modify(emp.userId, emp, 2).subscribe();
  }

  deletePost() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [this.clickedPost, 'post']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.remove(this.clickedPost.postId).subscribe(() => {
          this.clickedPost = null;
        }, error => console.log(error));
      }
    });
  }
  addPost() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '800px',
      height: '430px',
      data: [null, 1]
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.reloadData();
      }
    });
  }
}
