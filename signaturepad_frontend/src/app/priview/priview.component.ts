import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
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
  ngOnInit(): void {
    debugger;
  }

  open(content: any) {
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
    //   (result) => {
    //   debugger
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason: any) => {
    //   debugger
    //   this.closeResult = `Dismissed`;
    // });
  }

  download() {
    var link = document.createElement('a');

    document.body.appendChild(link); // for Firefox

    link.setAttribute('href', this.imgURL);
    link.setAttribute('download', 'mrHankey.jpg');
    link.click();
  }
}
