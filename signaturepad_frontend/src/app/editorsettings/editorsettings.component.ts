import {
  Component,
  Output,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-editorsettings',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './editorsettings.component.html',
  styleUrl: './editorsettings.component.scss',
})
export class EditorsettingsComponent implements OnInit {
  @Input() strokeWidth: number = 0;

  @Output() selectedStrokeWidth = new EventEmitter<number>();
  disabled: boolean = false;
  showTicks: boolean = true;
  step: number = 1;
  thumbLabel: boolean = false;
  value: number = 0;
 
  ngOnInit(): void {}

  onInputChange(data:number) {
    this.strokeWidth = data;
    this.selectedStrokeWidth.emit(this.strokeWidth);
  }

  formatLabel(value: number): string {
    this.strokeWidth = value;
    return `${value}`;
  }
}
