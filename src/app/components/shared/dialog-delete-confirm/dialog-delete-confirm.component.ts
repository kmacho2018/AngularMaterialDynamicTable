import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-confirm',
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrls: ['./dialog-delete-confirm.component.css'],
})
export class DialogDeleteConfirmComponent implements OnInit {
  id: any;
  @Output() onDeleteConfirmEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteConfirm() {
    this.onDeleteConfirmEvent.emit(this.id);
  }
  ngOnInit() {
    this.id = this.data.id;
    this.onDeleteConfirmEvent = this.data.event;
  }
}
