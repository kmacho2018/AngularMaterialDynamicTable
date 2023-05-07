import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';
import { columnDefinition } from './components/shared/material-custom-table/model/column';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataURL = 'https://dummyjson.com/products';

  columns: columnDefinition[] = [
    new columnDefinition('select'), //Checkbox column
    new columnDefinition('id', 'Id', true),
    new columnDefinition('title', 'Title'),
    new columnDefinition('description', 'Description'),
    new columnDefinition('action'), //ACtions buttons column
  ];

  columns2: columnDefinition[] = [
    //new columnDefinition('select'), //Checkbox column
    new columnDefinition('id', 'Id', true),
    new columnDefinition('title', 'Title'),
    new columnDefinition('description', 'Description'),
    new columnDefinition('action'), //ACtions buttons column
  ];

  data = [
    {
      id: 1,
      title: 'Iphone',
      description: 'Iphone 13 Pro Max',
    },
    {
      id: 2,
      title: 'Android',
      description: 'Samsung galaxy Fold',
    },
    {
      id: 3,
      title: 'Huawei',
      description: 'Huawei P22 Pro',
    },
  ];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  onDeleteConfirm(id: any) {
    this.openSnackBar('The record number #' + id + ' was deleted.', 'ok');
  }

  onEdit(id: any) {
    this.openSnackBar('The record #' + id + ' will be sent to edit', 'ok');
  }

  onView(id: any) {
    this.openSnackBar(
      'It will be sent to see the details of the record #' + id,
      'ok'
    );
  }

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
