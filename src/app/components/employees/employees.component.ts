import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Department} from '../../models/Department';
import {User} from '../../models/User';
import {DepartmentService} from '../../services/department/department.service';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';
import {UserService} from '../../services/user/user.service';
import {EmployeeDetailsComponent} from '../../dialogs/employee-details/employee-details.component';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {ImageService} from '../../services/image/image.service';


export class Image {
  constructor(imageName: string, imageFile: any) {
    this.imageName = imageName;
    this.imageFile = imageFile;
  }

  imageName ;
  imageFile: any;
}



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  @Output() outPutData = new EventEmitter<any>();
  clickedDep: Department;
  thisIsEmp: boolean;
  searchText;
  showHideInput: boolean;
  chefDep: User;
  users: User[];
  usersForDep: User[];
  images: Image[] = [];
  image: Image ;
  private deleteId: number;
  showUsers: boolean;
  img: any ;
  loading: boolean;
   user: User;
  constructor(
              private themeChanger: ThemeChangerService, public dialog: MatDialog, public router: Router,
              private departmentService: DepartmentService, private userService: UserService, private imageService: ImageService) {
    this.loading = true;
    if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
      this.clickedDep = new Department();
      this.clickedDep.depId = -1;
      this.thisIsEmp = false;
    } else {
      this.clickedDep = null;
      this.thisIsEmp = true;
      this.users = [];
    }
  }

  ngOnInit(): void {
    this.showUsers = true;
    this.showHideInput = false;
    console.log('qsdqsdqsdqs' + this.thisIsEmp);
    if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)'
        || this.router.url === '/RemoteMonitoring/(mainCon:Absences)' || this.router.url === '/RemoteMonitoring') {
      this.reloadData();
    }
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

  setDepartment(dep: Department) {
    this.users = [];
    this.chefDep = null;
    this.thisIsEmp = false;
    this.clickedDep = dep;
    if (this.clickedDep.depId !== -1) {
      this.setChefDep(this.clickedDep.depId);
      this.users = this.clickedDep.users;
      this.getImages(this.clickedDep.users);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
  setChefDep(cDepId: number) {
    this.departmentService.getChefDep(cDepId).subscribe(user => {
      this.chefDep = user;
    });
  }

  showDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [this.clickedDep, 'department']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteId = this.clickedDep.depId;
        this.departmentService.remove(this.clickedDep.depId).subscribe(() => {
          this.clickedDep = new Department();
          this.clickedDep.depId = -1;
          this.outPutData.emit();
          console.log('Refreshing departments..');
        }, error1 => console.log(error1));
      }
    });
  }

  showAddDepDialog(): void {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '500px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      console.log('Refreshing departments..');
      this.outPutData.emit();
      }
    });
  }

  showUpdateDepDialog() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '615px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 2]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Refreshing departments..');
        this.outPutData.emit();
        console.log('Refreshing Employees..');
        this.setChefDep(this.clickedDep.depId);
      }
    });
  }

  showAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '900px',
      height: '615px',
      panelClass: 'matDialogClass',
      data: this.clickedDep
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)' || this.router.url === '/RemoteMonitoring/(mainCon:Absences)') {
          this.reloadData();
        } else {
          this.outPutData.emit();
          this.reloadData();
        }
      }
    });
  }

  private reloadData() {
    console.log('reloading employees..');
    this.userService.list().subscribe(r => {
      if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)' && this.clickedDep.depId !== -1) {
        this.chefDep = null;
        this.setChefDep(this.clickedDep.depId);
        this.usersForDep = r;
        this.users = [];
        for (const emp of this.usersForDep) {
          if (emp.department.depId === this.clickedDep.depId) {
            this.users.push(emp);
          }
        }
        this.clickedDep.users = [];
        this.clickedDep.users = this.users;
        this.outPutData.emit();
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        this.userService.findUserWithToken().subscribe(us => {
          this.users = [];
          this.users = r;
          this.getImages(this.users);
        });
    }
  }, () => {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }

  openDetailsDialog(emp: User) {
    if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
      emp.department = this.clickedDep;
    }
    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      width: '900px',
      height: '625px',
      panelClass: 'matDialogClass',
      data: emp
    });
    dialogRef.afterClosed().subscribe(result => {
      if (EmployeeDetailsComponent.refreshEmp) {
        console.log('Refreshing employees..');
        this.reloadData();
        if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
          this.outPutData.emit();
        }
      }
    });
  }
  openDeleteEmpDialog(emp: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [emp, 'employee']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.userService.remove(emp.userId).subscribe(() => {
          console.log('Refreshing employees..');
          this.reloadData();
        }, error1 => console.log(error1));
      }
    });
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  reloadFromSocket() {
    console.log('Reloading users from');
    this.reloadData();
  }
  showImage(name) {
    for (const img of this.images) {
      if (img.imageName === name) {
        return img.imageFile;
      }
    }
    return null;
  }

}
