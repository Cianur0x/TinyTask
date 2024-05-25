import { Component } from '@angular/core';
import { TagService } from '../../services/tag/tag.service';
import { StorageService } from '../../services/storage/storage.service';
import { ITag } from '../../models/task.models';
import { NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-all-tags',
  standalone: true,
  imports: [NgFor, MatCheckboxModule],
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.scss',
})
export class AllTagsComponent {
  allTags: ITag[] = [];
  aviso = '';
  constructor(
    private _tagService: TagService,
    private _storageService: StorageService
  ) {
    this.getTags();
  }

  getTags() {
    let id = this._storageService.getUser().id;
    this._tagService.getAllTags(id).subscribe({
      // recibe un obejto con la propiedad next, funcion cuando va bien, next se puede ejecutar varias veces, respuesta en varios trozos
      next: (data) => {
        this.allTags = data as ITag[];
      },
      error: (error) => {
        // en caso de error
        //console.error(error);
        this.setAviso('Error de conexión al servidor.');
      }, // complete en caso de que termine, a no ser que quieras recoger la casa, para cuando algo se termine
    });
  }

  setAviso(texto: string) {
    this.aviso = texto;
    setTimeout(() => (this.aviso = ''), 2000);
  }
}
