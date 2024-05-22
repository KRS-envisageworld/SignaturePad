import {
  Component,
  Inject,
  Output,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-editorsettings',
  standalone: true,
  imports: [
    ColorPickerModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatSliderModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './editorsettings.component.html',
  styleUrl: './editorsettings.component.scss',
})
export class EditorsettingsComponent implements OnInit {
  @Input() color: string = '';
  @Input() strokeWidth: number = 0;

  @Output() selectedColor = new EventEmitter<object>();
  disabled: boolean = false;
  max: number = 100;
  min: number = 0;
  showTicks: boolean = true;
  step: number = 1;
  thumbLabel: boolean = false;
  value: number = 0;
  colorPickerHeight: string;
  formatLabel(value: number): string {
    this.strokeWidth = value;

    return `${value}`;
  }
  constructor(private dialogRef: MatDialogRef<EditorsettingsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.color = data.color;
    this.strokeWidth = data.strokeWidth;
  }

  ngOnInit(): void {
    debugger
    this.colorPickerHeight = `${(window.outerHeight * 25) / 100}`;
  }

  onInputChange(data){
    this.strokeWidth = data.target.value;
    this.emitData();
  }

  selectColor(data) {
    this.color = data;
    this.emitData();
  }

  emitData(){
    const returnData = {
      newColor: this.color,
      strokeWidth: this.strokeWidth,
    };
    this.selectedColor.emit(returnData);
  }
}
