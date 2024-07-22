import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { AddTagDialogComponent } from '../../components/tags/add-tag-dialog/add-tag-dialog.component';
import { LittleTaskComponent } from '../../components/tasks/little-task/little-task.component';
import { ITag, ITask } from '../../models/task.models';
import { StorageService } from '../../services/storage/storage.service';
import { TagService } from '../../services/tag/tag.service';
import { InicioGeneralComponent } from '../inicio-general/inicio-general.component';

export interface checkBox {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: checkBox[];
  done: boolean;
}

@Component({
  selector: 'app-all-tags',
  standalone: true,
  imports: [
    NgFor,
    MatCheckboxModule,
    LittleTaskComponent,
    NgIf,
    FormsModule,
    MatDividerModule,
    InicioGeneralComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    NgClass,
    FontAwesomeModule,
  ],
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.scss',
})
export class AllTagsComponent {
  allTags: ITag[] = [];
  aviso = '';
  userId = 0;
  currentDate = new Date();
  allTasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  origin: ITask[] = [];
  allComplete: boolean = false;
  date = new Date();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();
  info: any;
  reset = faClockRotateLeft;
  dateFromInicio!: Date;
  tagId: number = 0;

  task: checkBox = {
    name: 'All',
    completed: false,
    color: 'accent',
    done: false,
    subtasks: [
      { name: 'To do', completed: false, color: 'primary', done: false },
      { name: 'Done', completed: false, color: 'primary', done: true },
    ],
  };

  @ViewChild(InicioGeneralComponent) inicioComponent?: InicioGeneralComponent;

  constructor(
    private _storageService: StorageService,
    private _tagService: TagService,
    public _dialog: MatDialog
  ) {
    this.userId = this._storageService.getUser().id;
    this.getTags();
    this.setAll(true);
  }

  tagClikeado(id: number) {
    if (this.tagId == id) {
      this.tagId = 0;
    } else {
      this.tagId = id;
    }
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }

    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }

    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  getTags() {
    this._tagService.getAllTags(this.userId).subscribe({
      next: (data) => {
        this.allTags = data as ITag[];
      },
      error: (error) => {
        console.error('Error de conexión al servidor.', error);
      },
    });
  }

  openDialogWithTag(tag: ITag): void {
    const dialogRef = this._dialog.open(AddTagDialogComponent, {
      data: {
        tag: tag,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.info = result;
      if (!!this.info) {
        if (this.info.operation.localeCompare('delete') == 0) {
          this.removeTag(this.info);
        } else if (this.info.operation.localeCompare('put') == 0) {
          this.updateTag(this.info);
        } else {
          console.log('info', this.info);
        }
      }
    });
  }

  openDialogAddTag(): void {
    const dialogRef = this._dialog.open(AddTagDialogComponent, {
      data: {}, // data vacia ª
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.info = result;
      if (!!this.info) {
        if (this.info.operation.localeCompare('post') == 0) {
          this.addTag(this.info);
        } else {
          console.log('info', this.info);
        }
      }
    });
  }

  addTag(info: any) {
    const tag: ITag = {
      id: info.tag.id,
      labelColor: info.tag.labelColor,
      name: info.tag.name,
      userId: info.tag.userId,
    };

    this.allTags.push(tag);
  }

  updateTag(info: any) {
    let index = this.allTags.findIndex((x) => x.id == info.tag.id);

    if (index > -1) {
      const tag: ITag = {
        id: info.tag.id,
        labelColor: info.tag.labelColor,
        name: info.tag.name,
        userId: info.tag.userId,
      };

      this.allTags[index] = tag;
      this.inicioComponent?.updateTag(tag);
    }
  }

  removeTag(info: any) {
    let index = this.allTags.findIndex((x) => x.id == info.tag.id);

    if (index > -1) {
      this.allTags.splice(index, 1);

      this.inicioComponent?.removeTag(info.tag.id, this.allTags[0]);
    }
  }
}
