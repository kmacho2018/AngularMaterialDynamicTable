import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { columnDefinition } from './model/column';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeleteConfirmComponent } from '../dialog-delete-confirm/dialog-delete-confirm.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-custom-table',
  templateUrl: './material-custom-table.component.html',
  styleUrls: ['./material-custom-table.component.css'],
})
export class MaterialCustomTableComponent implements OnInit {
  @Input() dataUrl: string;
  @Input() data: any[] = [];
  @Input() columns: columnDefinition[] = [];
  @Output() onDeleteConfirmEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onViewEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() EnableEditButton: boolean = true;
  @Input() EnableDeleteButton: boolean = true;
  @Input() EnableViewButton: boolean = true;
  @Input() ExportButtons: boolean = true;

  onEdit(row: any) {
    let column = this.columns.find((x) => x.primaryKeyColumn === true);
    type ObjectKey = keyof typeof row;
    let propertyName = column?.name as ObjectKey;
    this.onEditEvent.emit(row[propertyName]);
  }

  onView(row: any) {
    let column = this.columns.find((x) => x.primaryKeyColumn === true);
    type ObjectKey = keyof typeof row;
    let propertyName = column?.name as ObjectKey;
    this.onViewEvent.emit(row[propertyName]);
  }

  openDeleteDialog(
    row: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    let column = this.columns.find((x) => x.primaryKeyColumn === true);
    type ObjectKey = keyof typeof row;
    let propertyName = column?.name as ObjectKey;

    this.dialog.open(DialogDeleteConfirmComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: row[propertyName],
        event: this.onDeleteConfirmEvent,
      },
    });
  }

  refreshGrid() {
    if (this.dataUrl != '' && this.dataUrl != undefined) {
      this.http.get<any>(this.dataUrl).subscribe((response) => {
        this.data = response.products;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar('Data load successfully.', 'Ok');
      });
    } else {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.openSnackBar('Data load successfully.', 'Ok');
    }
  }

  filterColumn(column: columnDefinition) {
    return column.name !== 'select' && column.name !== 'action';
  }

  filterColumnSelect(column: columnDefinition) {
    return column.name === 'select';
  }

  filterColumnAction(column: columnDefinition) {
    return column.name === 'action';
  }

  displayedColumns: String[] = this.columns.map((x) => x.name);
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data);
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selection = new SelectionModel<any>(true, []);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onTableAction(e: any): void {
    //this.action.emit(e)
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
  ngOnInit(): void {
    this.displayedColumns = this.columns.map((x) => x.name); //[];//['select','id', 'name','lastName', 'action'];
    this.refreshGrid();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
