import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgOptimizedImage } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'app-features',
  standalone: true,
  imports: [MatGridListModule, NgOptimizedImage],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  tiles: Tile[] = [
    {
      text: 'assets/imgs/bwink_bld_03.jpg',
      cols: 3,
      rows: 3,
      color: 'lightblue',
    },
    {
      text: 'assets/imgs/bwink_bld_03.jpg',
      cols: 1,
      rows: 1,
      color: 'lightgreen',
    },
    {
      text: 'assets/imgs/bwink_bld_03.jpg',
      cols: 1,
      rows: 1,
      color: 'lightpink',
    },
    {
      text: 'assets/imgs/bwink_bld_03.jpg',
      cols: 1,
      rows: 1,
      color: '#DDBDF1',
    },
  ];
}
