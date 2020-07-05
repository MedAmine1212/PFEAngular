/** Flat node with expandable and level information */
import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, DataSource, SelectionChange} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/department/department.service';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {MatDialog} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {User} from '../../models/User';
import {GetRoleService} from '../../services/getRole/get-role.service';

export class DynamicFlatNode {
  constructor(public item: Department, public level = 1, public expandable = false,
              public isLoading = false) {}
}
/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  departments: Department[] = [];
  dataMap = new Map<number, Department[]>([]);
  rootLevelNodes: Department[] = [];
  loading = true;
  initialData(data: Department[]): DynamicFlatNode[] {
    this.rootLevelNodes = [];
    this.dataMap.clear();
    this.departments = data;
    for (const dep of this.departments) {
      if (dep.supDep == null) {
        this.rootLevelNodes.push(dep);
      } else {
        this.dataMap.set(dep.depId, dep.departments);
      }
    }
    this.loading = false;
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, this.isExpandable(name)));
  }

  getChildren(node: Department): Department[] | undefined {
    return node.departments;
  }

  isExpandable(node: Department): boolean {
    return node.departments.length !== 0;
  }
}
export class DynamicDataSource implements DataSource<DynamicFlatNode> {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'app-departments',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ]
    ),
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})


export class DepartmentsComponent implements  OnInit {
  @Output() outPutData = new EventEmitter<Department>();
  role: string;
  data: Department[] = [];
  fakedep: Department;
  clickedDep: Department;
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  connectedUser: User;
  constructor(
              private roleService: GetRoleService,
              private themeChanger: ThemeChangerService,
              public dialog: MatDialog, public database: DynamicDatabase, private departmentService: DepartmentService) {
  }
  sendData(dep: Department) {
    if (dep.depId === -1) {
      this.clickedDep = dep;
      this.outPutData.emit(this.clickedDep);
    } else {
      this.departmentService.findById(dep.depId).subscribe(r => {
        this.clickedDep = r;
        this.outPutData.emit(this.clickedDep);
      }, error => console.log(error));
      }
  }
  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  ngOnInit(): void {
    this.getConnectedUser();
    this.getRole();
    this.clickedDep = new Department();
    this.clickedDep.depId = -1;
    this.fakedep = this.clickedDep;
    this.reloadData();
    this.unselectDep();
  }
  getConnectedUser() {
    if (this.roleService.getConnectedUser() == null) {
      setTimeout(() => {
        this.getConnectedUser();
      }, 500);
    } else {
      this.connectedUser = this.roleService.connectedUser;
    }
  }
  unselectDep() {
    this.sendData(this.fakedep);
  }

  public reloadData() {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);
    this.data = [];
    this.departmentService.list().subscribe(r => {
      if (this.role !== 'admin') {
      r.forEach(dep => {
        if (dep.depId === this.connectedUser.department.depId && this.roleService.isChefDep()) {
          this.data.push(dep);
        }
      });
      } else if (this.role === 'admin') {
        this.data = r;
      }
      this.dataSource.data = this.database.initialData(this.data);
      if (this.clickedDep != null) {
      if (this.clickedDep.depId !== -1) {
        const ids: number[] = [];
        for (const dep of this.data) {
          ids.push(dep.depId);
        }
        if (ids.indexOf(this.clickedDep.depId) > -1) {
            this.sendData(this.clickedDep);
        } else {
          this.unselectDep();
        }
      }
    }
    }, error => this.database.loading = false);
  }
  addDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '460px',
      data: [null, 1]
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.reloadData();
      }
    });
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  getRole() {
   this.role = this.roleService.userRole();
  }
}
