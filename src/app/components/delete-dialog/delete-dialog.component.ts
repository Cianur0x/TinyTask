import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AdminService } from '../../services/adminServices/admin.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  userId: number = 0;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private _adminService: AdminService
  ) {
    dialogRef.disableClose = true;
    this.userId = data.id;
  }

  deleteUser() {
    this._adminService.deleteUser(this.userId).subscribe({
      next: () => {
        this.dialogRef.close({ id: this.userId });
      },
      error: (err) => {
        console.log('task NO borrada');
      },
    });
  }
}
