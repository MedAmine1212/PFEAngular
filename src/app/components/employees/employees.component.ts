import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {Department} from '../../models/Department';
import {User} from '../../models/User';
import {DepartmentService} from '../../services/department/department.service';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';
import {UserService} from '../../services/user/user.service';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {ImageService} from '../../services/image/image.service';
import * as Jspdf from 'jspdf';
import 'jspdf-autotable';
import {EmployeeDetailsComponent} from '../employee-details/employee-details.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Planning} from '../../models/Planning';
import {PlanningDetailsComponent} from '../planning-details/planning-details.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {SetDepartmentPlanningComponent} from '../../sheets/set-department-planning/set-department-planning.component';
import {PlanningService} from '../../services/planning/planning.service';
import {GetRoleService} from '../../services/getRole/get-role.service';


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
  @ViewChild(PlanningDetailsComponent) planningDetailsComp: PlanningDetailsComponent;
  clickedDep: Department;
  thisIsEmp: boolean;
  searchText;
  showHideInput: boolean;
  chefDep: User;
  users: User[];
  usersForDep: User[];
  private deleteId: number;
  showUsers: boolean;
  img: any ;
  loading: boolean;
   user: User;
  head = [['ID', 'Last name', 'Firstname', 'Gender', 'CIN', 'Email', 'Phone', 'Birthday', 'Hireday', 'Post']];
  data = [];
  clickedPlanning: Planning;
  clickedEmp: User;
  connectedUser: User;
  role: string;
  constructor(
          private roleService: GetRoleService,
          private planningService: PlanningService,
          private bottomSheet: MatBottomSheet,
          private snackBar: MatSnackBar,
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
    this.getRole();
    this.connectedUser = this.roleService.getConnectedUser();
    this.showUsers = true;
    this.showHideInput = false;
    if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)'
        || this.router.url === '/RemoteMonitoring/(mainCon:Absences)' || this.router.url === '/RemoteMonitoring') {
      this.reloadData();
    }
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
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
        }, error => {
          if (this.users.indexOf(emp) === (this.users.length - 1)) {
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
        });
    }
  }

  getTime(hour: number) {
    const h = Math.floor(hour / 60);
    const m = hour % 60;
    let returnTime: string;
    returnTime = '';
    if (h < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + h.toString() + ':';
    if (m < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + m.toString();
    return returnTime;
  }

  setDepartment(dep: Department) {
    this.users = [];
    this.chefDep = null;
    this.thisIsEmp = false;
    this.clickedDep = dep;
    if (this.clickedDep.depId !== -1) {
      this.setChefDep(this.clickedDep.depId);
      this.users = this.clickedDep.users;
      if (this.clickedDep.planning != null) {
      this.clickedPlanning = this.clickedDep.planning;
      setTimeout(() => {
        this.planningDetailsComp.setClickedPl(this.clickedPlanning);
      }, 600);
      }
      this.fillBody(this.users);
      this.getImages();
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
        console.log('added');
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
        this.setChefDep(this.clickedDep.depId);
      }
    });
  }
  showAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '900px',
      height: '625px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)' || this.router.url === '/RemoteMonitoring/(mainCon:Absences)') {
          this.reloadData();
        } else {
          if (this.roleService.isAdmin()) {
          this.reloadData();
          }
        }
      }
    });
  }

  private reloadData() {
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
        this.getImages();
        setTimeout(() => {
          this.loading = false;
        }, 500);

      } else {
        this.users = [];
        if (this.roleService.isAdmin()) {
          this.users = r;
        } else if (this.roleService.isChefDep()) {
          for (const emp of r) {
            if (emp.department.depId === this.connectedUser.department.depId) {
              this.users.push(emp);
            }
          }
        }
        this.head[0].push('Department');
        this.fillBody(this.users);
        this.getImages();
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
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '900px',
      height: '625px',
      panelClass: 'matDialogClass',
      data: [emp, 2]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (EmployeeDetailsComponent.refreshEmp) {
        setTimeout(() => {
          this.reloadData();
        }, 100);
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
          this.loading = true;
          this.userService.remove(emp.userId).subscribe(() => {
          this.reloadData();
        }, error1 => console.log(error1));
      }
    });
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  reloadFromSocket() {
    this.reloadData();
  }
  public openPDF(): void {
    if (this.users.length > 0) {
    const doc = new Jspdf('l', 'pt', 'a4');
    if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
      doc.text(this.clickedDep.depName + ' Employees', 15, 25);
    } else if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)') {
      doc.text('All  Employees', 15, 25);
    }
    (doc as any).autoTable({
      margin: { left: 25, right: 25 },
      head: this.head ,
      body: this.data
    });
    if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
      doc.setProperties({
        title: this.clickedDep.depName + ' Employees'
      }); } else if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)') {
      doc.setProperties({
        title: ' Employees'
      });
    }
    doc.output('dataurlnewwindow');
    } else {
      setTimeout(() => {
        const config = new MatSnackBarConfig();
        if (this.themeChanger.getTheme()) {
          config.panelClass = ['snackBar'];
        } else {
          config.panelClass = ['snackBarDark'];
        }
        config.duration = 3000;
        this.snackBar.open('No users to export', null, config);

      }, 500);
    }
  }

  private fillBody(users: User[]) {
    let i = 0;
    this.data = [];
    users.forEach(user => {
      // tslint:disable-next-line:max-line-length
      let post = 'No post assigned';
      if (!!user.post) {
        post = user.post.postName;
      }
      this.data.push([user.userId, user.name, user.firstName, user.gender, user.cin, user.email, user.phone, user.birthDate,
        user.hireDay, post]);
      if (this.router.url !== '/RemoteMonitoring/(mainCon:Departments)') {
        this.data[i].push([user.department.depName]);
      }
      i++;
    });
  }

  openPlanningSheet() {
    this.bottomSheet.open(SetDepartmentPlanningComponent , {
      data: this.clickedDep
    });
    this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(() => {
      if (this.clickedDep.planning != null) {
        setTimeout(() => {
          this.clickedPlanning = this.clickedDep.planning;
          this.planningDetailsComp.setClickedPl(this.clickedPlanning);
        }, 600);
      }
    });
  }

  removePlanning() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [null, 'removeDePl']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      let pl: Planning;
      this.planningService.findById(this.clickedDep.planning.planningId).subscribe(r => {
        pl = r;
        for (const dep of pl.departments) {
          if (dep.depId === this.clickedDep.depId) {
            pl.departments.splice(pl.departments.indexOf(dep), 1);
            break;
          }
        }
        this.planningService.modify(pl, pl.planningId, 1).subscribe(() => {
          this.clickedDep.planning = null;
        }, error => console.log(error));
      }, error => console.log(error));
      }
  });
}

  setClickedEmployee(emp: User) {
    if ((this.router.url === '/RemoteMonitoring/(mainCon:Absences)' || this.router.url === '/RemoteMonitoring')) {
      if (this.clickedEmp !== emp) {
      this.clickedEmp = emp;
      this.outPutData.emit(emp);
      } else {
        this.clickedEmp = null;
        this.outPutData.emit(null);
      }
    }
  }

  getRole() {
    this.role = this.roleService.userRole();
  }
}
