import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { MaterialCustomTableComponent } from './material-custom-table/material-custom-table.component';
import { DialogDeleteConfirmComponent } from './dialog-delete-confirm/dialog-delete-confirm.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { HttpClientModule } from '@angular/common/http';

const declarationComponents = [
  MaterialCustomTableComponent,
  DialogDeleteConfirmComponent,
];
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatTableExporterModule,
    HttpClientModule,
  ],
  declarations: [declarationComponents],
  exports: [declarationComponents],
})
export class SharedModule {}
