import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PriviewComponent } from '../priview/priview.component';
import { EditorsettingsComponent } from '../editorsettings/editorsettings.component';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatIconModule} from '@angular/material/icon'
import { PopoverModule } from 'ngx-bootstrap/popover';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
@Component({
  selector: 'app-signaturepad',
  standalone: true,
  imports: [CommonModule, ColorPickerModule, MatDialogModule,MatIconModule,PopoverModule,EditorsettingsComponent],
  templateUrl: './signaturepad.component.html',
  styleUrl: './signaturepad.component.scss',
})
export class SignaturepadComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  canvasContext: any;
  clearButton: any;
  saveButton: any;
  strokeColor: string = '#120404';
  strokeWidth: number = 1;
  lineWidth: number = 20;
  private mouseDown: boolean = false;
  x_cordinate = 0;
  y_cordinate = 0;
  imgURL: string = '';
  bErasing: boolean = false;
  isSettingsOpen: boolean = false;
  isSaveInProcess: boolean = false;
   canvasObj: HTMLCanvasElement;
  constructor(private matdialog: MatDialog) {}

  initializeCanvasStyle() {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = this.strokeColor;
      this.canvasContext.shadowColor = 'red';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineWidth = this.strokeWidth;
    }
  }

  enableEraser() {
    this.bErasing = !this.bErasing;
  }

  ngOnInit(): void {
    this.canvasObj = this.canvas.nativeElement;
    this.canvasObj.width = window.outerWidth - 250;
    this.canvasObj.height = window.outerHeight - 300;

    this.canvasContext = this.canvasObj.getContext('2d');
    if (this.canvasContext) {
      this.initializeCanvasStyle();
    }
    this.canvasObj.addEventListener(
      'mousedown',
      (e: MouseEvent) => {
        this.onMouseDown(e);
      },
      false
    );
    this.canvasObj.addEventListener(
      'mouseup',
      (e) => {
        this.MouseUp(e);
      },
      false
    );
    this.canvasObj.addEventListener(
      'mousemove',
      (e) => {
        this.onMouseMove(e);
      },
      false
    );

    this.canvasObj.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        this.getTouchPos(e);
        e.preventDefault();
        this.mouseDown = true;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.x_cordinate, this.y_cordinate);
        console.log('touch start.');
      },
      false
    );

    this.canvasObj.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        debugger;
        this.getTouchPos(e);
        e.preventDefault();
        if (this.mouseDown) {
          if (this.bErasing == true) {
            this.canvasContext.globalCompositeOperation = 'destination-out';
          } else {
            this.canvasContext.globalCompositeOperation = 'source-over';
          }
          this.canvasContext.lineTo(this.x_cordinate, this.y_cordinate);
          this.canvasContext.stroke();
        }
        console.log('touch move.');
      },
      false
    );
    this.canvasObj.addEventListener(
      'touchend',
      () => {
        const mouseEvent = new MouseEvent('mouseup', {});
        this.canvasObj.dispatchEvent(mouseEvent);
        this.mouseDown = false;
        console.log('touch end.');
      },
      false
    );
  }

  MouseUp(event: MouseEvent) {
    event.preventDefault();
    this.mouseDown = false;
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this.mouseDown) {
      this.getCursorPositionOnPad(event);
      if (this.bErasing == true) {
        this.canvasContext.globalCompositeOperation = 'destination-out';
      } else {
        this.canvasContext.globalCompositeOperation = 'source-over';
      }
      this.canvasContext.lineTo(this.x_cordinate, this.y_cordinate);
      this.canvasContext.stroke();
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.getCursorPositionOnPad(event);
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.x_cordinate, this.y_cordinate);
    this.mouseDown = true;
  }

  getCursorPositionOnPad(event: MouseEvent) {
    const rect = this.canvasObj.getBoundingClientRect();
    this.x_cordinate = event.x - rect.left;
    this.y_cordinate = event.y - rect.top < 0 ? 0 : event.y - rect.top;
  }
  getTouchPos(touchEvent: TouchEvent) {
    var rect = this.canvasObj.getBoundingClientRect();
    this.x_cordinate = touchEvent.touches[0].clientX - rect.left;
    this.y_cordinate =
      touchEvent.touches[0].pageY - rect.top < 0
        ? 0
        : touchEvent.touches[0].pageY - rect.top;
  }

  clearCanvas() {
    this.canvasContext.beginPath();
    this.canvasContext.clearRect(
      0,
      0,
      this.canvasObj.width,
      this.canvasObj.height
    );
    this.imgURL = '';
  }
  openSettings(data:number) {
    this.strokeWidth = data;
    this.initializeCanvasStyle();
  }

  saveImage() {
    this.isSaveInProcess = true;
    this.imgURL = this.canvasObj.toDataURL('image/png');
    const modelWidth = window.innerWidth < 600 ? '60%' : '50%';
    const modelHeight = window.innerHeight > 705 ? '58vh' : '66vh';

    const dialogRef = this.matdialog.open(PriviewComponent, {
      width: modelWidth,
      height: modelHeight,
      data: {
        image: this.imgURL,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isSaveInProcess = false;
    });
  }
}
