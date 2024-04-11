import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-priview',
  standalone: true,
  imports: [],
  templateUrl: './priview.component.html',
  styleUrl: './priview.component.scss'
})
export class PriviewComponent {
imgURL:string="";
@Input() public image:string;
  constructor(@Inject(MAT_DIALOG_DATA) public modalData:any,
  public dialogRef: MatDialogRef<ImageEditorComponent>
  ) { }

  ngOnInit(): void {
    debugger;
    console.log(this.image);
    this.imgURL = this.modalData.image;

  }
  download(){
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", this.imgURL);
    link.setAttribute("download", "mrHankey.jpg");
    link.click();
 
  }
}
