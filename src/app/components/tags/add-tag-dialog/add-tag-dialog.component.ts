import { NgFor } from '@angular/common';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxColorsModule } from 'ngx-colors';
import { ITag } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';

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
  ],
  templateUrl: './add-tag-dialog.component.html',
  styleUrl: './add-tag-dialog.component.scss',
})
export class AddTagDialogComponent {
  hideRequiredControl = new FormControl('');
  allTags: ITag[] = [];
  deleteTag = false;
  currentTag!: ITag;
  tagForm!: FormGroup;
  user = this._storageService.getUser();

  constructor(
    public dialogRef: MatDialogRef<AddTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _taskService: TaskService,
    private _tagService: TagService,
    private _userService: UserService
  ) {
    dialogRef.disableClose = true;
    this.currentTag = data.tag;
    if (!!this.currentTag) {
      this.tagForm = this._formBuilder.group({
        tagColor: [this.currentTag.labelColor, Validators.required],
        tagName: [this.currentTag.name],
      });
    } else {
      this.tagForm = this._formBuilder.group({
        tagColor: ['#D81B60', Validators.required],
        tagName: ['', Validators.required],
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
    let userID = this.user.id;
    const formValues = this.tagForm.value;

    const tag: ITag = {
      id: 0,
      labelColor: formValues.tagColor,
      name: formValues.tagName,
      userId: userID,
    };

    // todo postTag
  }

  updateTag(tagForm: FormGroup<any>) {}

  removeTag() {}
}
