import {
  Component,
  Inject,
  Output,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editorsettings',
  standalone: true,
  imports: [
    ColorPickerModule,
    CommonModule
  ],
  templateUrl: './editorsettings.component.html',
  styleUrl: './editorsettings.component.scss',
})
export class EditorsettingsComponent implements OnInit {
  @Input() color: string = '';
  @Input() strokeWidth: number = 0;

  @Output() selectedColor = new EventEmitter<string>();
  newColor: string = '';
  formatLabel(value: number): string {
    this.strokeWidth = value;

    return `${value}`;
  }


  ngOnInit(): void {}

  selectColor() {
    this.newColor;
  }
}
