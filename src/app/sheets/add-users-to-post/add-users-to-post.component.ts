import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UserService} from '../../services/user/user.service';
import {ImageService} from '../../services/image/image.service';
import {User} from '../../models/User';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Post} from '../../models/Post';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-users-to-post',
  templateUrl: './add-users-to-post.component.html',
  styleUrls: ['./add-users-to-post.component.css']
})
export class AddUsersToPostComponent implements OnInit {
  users: User[];
  showHideInput: boolean;
  searchText;
  loading: boolean;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public clickedPost: Post,
    private changeDetectorRef: ChangeDetectorRef,
    private themeChanger: ThemeChangerService,
    private userService: UserService,
    private imageService: ImageService,
    private bottomSheetRef: MatBottomSheetRef<AddUsersToPostComponent>) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.showHideInput = false;
    this.changeDetectorRef.markForCheck();
    this.reloadData();
  }
  compare(emp: User) {
    for (const user of this.clickedPost.users) {
      if (emp.userId === user.userId) {
        return true;
      }
    }
    return false;
  }
  reloadData() {
    this.users = [];
    this.userService.list().subscribe(r => {
      for (const emp of r) {
        if (!this.compare(emp)) {
          this.users.push(emp);
        }
      }
      this.getImages();
    }, error => console.log(error));
  }
  getImages() {
    for (const emp of this.users) {
      this.imageService.load(emp.image).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        img  => {
          if (img != null ) {
            // @ts-ignore
            const base64Data = img.picByte;
            emp.fullImage =  'data:image/jpeg;base64,' + base64Data;
          } else {
            emp.fullImage = null;
          }
          if (this.users.indexOf(emp) === (this.users.length - 1)) {
            this.loading = false;
            setTimeout(() => {
              this.changeDetectorRef.detectChanges();
            }, 500);
          }
        });
    }
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }

  updateUser(emp: User) {
    if (emp.post != null) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '400px',
        height: '380',
        data: [null, 'changePost']
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         this.override(emp);
        }
      });
    } else {
     this.override(emp);
    }
  }

  override(emp: User) {
    emp.post = this.clickedPost;
    this.userService.modify(emp.userId, emp, 2).subscribe();
    this.users.splice(this.users.indexOf(emp), 1);
    this.changeDetectorRef.detectChanges();
  }
}
