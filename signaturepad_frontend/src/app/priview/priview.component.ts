import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-priview',
  standalone: true,
  imports: [],
  templateUrl: './priview.component.html',
  styleUrl: './priview.component.scss'
})
export class PriviewComponent {
imgURL:string="";
@Input() public image:string = "";
  closeResult: string;
constructor() {}
  ngOnInit(): void {
    debugger;
    console.log(this.image);
    this.imgURL = "";

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

  download(){
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", this.imgURL);
    link.setAttribute("download", "mrHankey.jpg");
    link.click();
 
  }
}
