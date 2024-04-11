import {
  Component,
  Inject,
  Output,
  Input,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editorsettings',
  standalone: true,
  imports: [],
  templateUrl: './editorsettings.component.html',
  styleUrl: './editorsettings.component.scss'
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
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public dialogRef: MatDialogRef<DrawingsettingsComponent>
  ) {
    debugger
    dialogRef.disableClose = true;
    this.color = modalData.color;
    this.strokeWidth = modalData.strokeWidth;

  }

  ngOnInit(): void {}

  selectColor() {
    this.newColor;
  }
  closeDialog() {
    debugger;
    this.dialogRef.close({ color: this.color, strokeWidth:this.strokeWidth });
  }
}
