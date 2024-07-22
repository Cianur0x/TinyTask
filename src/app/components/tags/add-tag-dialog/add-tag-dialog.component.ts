import { NgFor, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxColorsModule } from 'ngx-colors';
import { ITag, ITagBack } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';

@Component({
  selector: 'app-add-tag-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, // para que funcione forms group en el html
    MatIcon,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    FontAwesomeModule,
    NgFor,
    NgxColorsModule,
    NgIf,
  ],
  templateUrl: './add-tag-dialog.component.html',
  styleUrl: './add-tag-dialog.component.scss',
})
export class AddTagDialogComponent {
  hideRequiredControl = new FormControl('');
  allTags: ITag[] = [];
  deleteTag = false;
  currentTag!: ITag;
  user = this._storageService.getUser();
  tagForm: FormGroup = this._formBuilder.group({
    tagColor: '',
    tagName: '',
  });

  constructor(
    public dialogRef: MatDialogRef<AddTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _tagService: TagService
  ) {
    dialogRef.disableClose = true;
    this.currentTag = data.tag;
    if (!!this.currentTag) {
      this.tagForm = this._formBuilder.group({
        tagColor: [this.currentTag.labelColor, Validators.required],
        tagName: [
          this.currentTag.name,
          [Validators.required, Validators.maxLength(15)],
        ],
      });
    } else {
      this.tagForm = this._formBuilder.group({
        tagColor: ['#D81B60', Validators.required],
        tagName: ['', [Validators.required, Validators.maxLength(15)]],
      });
    }
  }

  onSubmit() {
    if (this.deleteTag) {
      this.removeTag();
    } else {
      if (!!this.currentTag) {
        this.updateTag(this.tagForm);
      } else {
        this.addTag();
      }
    }
  }

  addTag() {
    const userID = this.user.id;
    const formValues = this.tagForm.value;

    const tag: ITagBack = {
      id: 0,
      labelColor: formValues.tagColor,
      name: formValues.tagName,
      user: {
        id: userID,
      },
    };

    this._tagService.postTask(tag).subscribe({
      next: (data) => {
        this.dialogRef.close({
          tag: data,
          operation: 'post',
        });
      },
      error: (err) => {
        this.openSnackBar('Cant add tag');
      },
    });
  }

  updateTag(tagForm: FormGroup<any>) {
    const userID = this.user.id;
    const formValues = tagForm.value;

    const tag: ITagBack = {
      id: this.currentTag.id,
      labelColor: formValues.tagColor,
      name: formValues.tagName,
      user: {
        id: userID,
      },
    };

    this._tagService.updateTask(tag).subscribe({
      next: (data) => {
        this.dialogRef.close({
          tag: data,
          operation: 'put',
        });
      },
      error: (err) => {
        this.openSnackBar('Cant update tag');
      },
    });
  }

  removeTag() {
    this._tagService.deleteTag(this.currentTag.id).subscribe({
      next: () => {
        this.dialogRef.close({
          tag: this.currentTag,
          operation: 'delete',
        });
      },
      error: (err) => {
        this.openSnackBar('Cant delete tag');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 4 * 1000,
    });
  }
}
