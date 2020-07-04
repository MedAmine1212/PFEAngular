import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataBaseExportImportService} from '../../services/dataBaseImportExport/data-base-export-import.service';

@Component({
  selector: 'app-import-data-base',
  templateUrl: './import-data-base.component.html',
  styleUrls: ['./import-data-base.component.css']
})
export class ImportDataBaseComponent implements OnInit {
  noFileSelected: boolean;
  uploadDone: boolean;
  backup: boolean;
  importing: boolean;
  selectedFile: File;

  constructor(
              private dataBaseExportImportService: DataBaseExportImportService,
              public dialogRef: MatDialogRef<ImportDataBaseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<any>) {
    this.noFileSelected = true;
  }

  ngOnInit(): void {
  }

  onSelectFile(files: FileList) {
    if (files.length === 0) {
      return;
    } else {
      this.noFileSelected = false;
      this.selectedFile = files[0] as File;
    }
  }

  done() {
    this.uploadDone = true;
    this.backup = true;
    this.dataBaseExportImportService.exportDB(0).subscribe(() => {
      setTimeout(() => {
        this.backup = false;
        this.importing = true;
        setTimeout(() => {
          this.dialogRef.close([true, this.selectedFile]);
        }, 800);
      }, 800);
    }, error => console.log(error));

  }

  closeThis() {
    this.dialogRef.close([false, null]);
  }
}
