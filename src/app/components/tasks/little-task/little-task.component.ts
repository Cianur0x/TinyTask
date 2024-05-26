import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-little-task',
  standalone: true,
  imports: [],
  templateUrl: './little-task.component.html',
  styleUrl: './little-task.component.scss',
})
export class LittleTaskComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes ', changes);
  }
}
