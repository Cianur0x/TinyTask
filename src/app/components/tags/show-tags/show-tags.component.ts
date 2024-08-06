import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ITag } from '../../../models/task.models';
import { MatIconModule } from '@angular/material/icon';
import { AddTagDialogComponent } from '../add-tag-dialog/add-tag-dialog.component';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TagsChartComponent } from '../../charts/tags-chart/tags-chart.component';
import { DoughnutChartComponent } from '../../charts/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-show-tags',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    MatIconModule,
    MatButtonModule,
    TagsChartComponent,
    DoughnutChartComponent,
  ],
  templateUrl: './show-tags.component.html',
  styleUrl: './show-tags.component.scss',
})
export class ShowTagsComponent {
  allTags: ITag[] = [];
  tagId: number = 0;
  userId: number = 0;
  info: any;
  tagSelected: number = 0;

  constructor(
    private _storageService: StorageService,
    private _tagService: TagService,
    public _dialog: MatDialog
  ) {
    this.userId = this._storageService.getUser().id;
    this.getTags();
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

  tagClikeado(id: number) {
    if (this.tagId == id) {
      this.tagId = 0;
      this.tagSelected = 0;
    } else {
      this.tagId = id;
      this.tagSelected = id;
    }
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

  addTag(info: any) {
    const tag: ITag = {
      id: info.tag.id,
      labelColor: info.tag.labelColor,
      name: info.tag.name,
      userId: info.tag.userId,
    };

    this.allTags.push(tag);
    this.allTags = this.allTags.slice();
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

      this.allTags = this.allTags.slice();
    }
  }

  removeTag(info: any) {
    let index = this.allTags.findIndex((x) => x.id == info.tag.id);

    if (index > -1) {
      this.allTags.splice(index, 1);

      this.allTags = this.allTags.slice();
    }
  }
}
