import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
import { v1 as uuid } from "uuid";
@Component({
  selector: 'app-priview',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatCardModule,MatIconModule],
  templateUrl: './priview.component.html',
  styleUrl: './priview.component.scss',
})
export class PriviewComponent {
  imgURL: string = '';
  closeResult: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imgURL = data.image;
  }
  ngOnInit(): void {}

  download() {
    var link = document.createElement('a');

    document.body.appendChild(link); // for Firefox

    link.setAttribute('href', this.imgURL);
    link.setAttribute('download', `${uuid()}.png`);
    link.click();
  }
}
