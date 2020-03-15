/** Flat node with expandable and level information */
import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, DataSource, SelectionChange} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/departement/department.service';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {MatDialog} from '@angular/material/dialog';

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
  selector: 'app-departements',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})


export class DepartmentsComponent implements  OnInit {
  @Output() outPutData = new EventEmitter<Department>();
  data: Department[];
  fakedep: Department;
  clickedDep: Department;
  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;
  constructor(public dialog: MatDialog, private database: DynamicDatabase, private departmentService: DepartmentService) {
  }

  sendData(dep: Department) {
    this.clickedDep = dep;
    this.outPutData.emit(dep);
  }
  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  ngOnInit(): void {
    this.clickedDep = new Department();
    this.clickedDep.depId = -1;
    this.fakedep = this.clickedDep;
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);
    this.departmentService.list().subscribe(r => {
      this.data = r;
      this.dataSource.data = this.database.initialData(this.data);
      this.unselectDep();
    });

  }


  unselectDep() {
    this.sendData(this.fakedep);
  }

  addDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '600px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
