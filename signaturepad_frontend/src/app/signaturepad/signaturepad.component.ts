import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageEditorComponent } from '../image-editor/image-editor.component';
import { DrawingsettingsComponent } from '../drawingsettings/drawingsettings.component';

@Component({
  selector: 'app-signaturepad',
  standalone: true,
  imports: [],
  templateUrl: './signaturepad.component.html',
  styleUrl: './signaturepad.component.scss'
})
export class SignaturepadComponent {
@ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('signatureImg', { static: true }) signatureImg: ElementRef;

  /**
   *
   */
  constructor(public matdialog: MatDialog) {}

  canvasObj: HTMLCanvasElement;
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
  @ViewChild('modal') content: ElementRef;
  undo: object[] = [];
  redo: object[] = [];
  track: any = {
    color: '',
    line: 0,
    source_x: 0,
    source_y: 0,
    dest_x: 0,
    dest_y: 0,
  };

  open() {
    if (!true) {
      // Dont open the modal
      this.content.nativeElement.modal('hide');
    } else {
      debugger;
      // Open the modal
      this.content.nativeElement.modal('show');
    }
  }
  enableEraser() {
    this.bErasing = !this.bErasing;
  }

  fnUndo() {
    debugger;
    while (this.undo.length) {
      let trackObj: any = this.undo.pop();
      this.strokeColor = trackObj.color;
      this.lineWidth = trackObj.line;
      this.x_cordinate = trackObj.source_x;
      this.y_cordinate = trackObj.source_y;

      this.initializeCanvasStyle();
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(this.x_cordinate, this.y_cordinate);

      this.x_cordinate = trackObj.dest_x;
      this.y_cordinate = trackObj.dest_y;
      this.canvasContext.clearRect(
        this.x_cordinate,
        this.y_cordinate,
        this.canvasObj.width,
        this.canvasObj.height
      );
      this.canvasContext.stroke();
      this.redo.push(trackObj);
    }
  }
  fnRedo() {
    let trackObj = this.redo.pop();
    if (trackObj) {
      this.undo.push(trackObj);
    }
  }
  ngOnInit(): void {
    this.canvasObj = this.canvas.nativeElement;
    this.canvasObj.width = window.outerWidth - 30;
    this.canvasObj.height = window.outerHeight - 300;

    this.canvasContext = this.canvasObj.getContext('2d');
    if (this.canvasContext) {
      this.initializeCanvasStyle();
    }
    this.canvasObj.addEventListener("mousedown",  (e:MouseEvent) => {
      this.onMouseDown(e);
      }, false);
      this.canvasObj.addEventListener("mouseup", (e) => {
      this.MouseUp(e);
      }, false);
      this.canvasObj.addEventListener("mousemove", (e)=> {
        this.onMouseMove(e);}, false);

    this.canvasObj.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        this.getTouchPos(e);
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        this.canvasObj.dispatchEvent(mouseEvent);
      console.log("touch start.")
      },
      false
    );
    this.canvasObj.addEventListener("touchend", () => {
      const mouseEvent = new MouseEvent("mouseup", {});
      this.canvasObj.dispatchEvent(mouseEvent);
      console.log("touch end.")
  }, false);

  this.canvasObj.addEventListener("touchmove", (e: TouchEvent) => {
    this.getTouchPos(e);
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    this.canvasObj.dispatchEvent(mouseEvent);
    console.log("touch move.")

}, false);


  }


  
  getTouchPos(touchEvent: TouchEvent) {
    var rect = this.canvasObj.getBoundingClientRect();
    (this.x_cordinate = touchEvent.touches[0].clientX - rect.left),
    (this.y_cordinate = touchEvent.touches[0].clientY- rect.top < 0 ? 0 : touchEvent.touches[0].clientY - rect.top);
  }

  initializeCanvasStyle() {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = this.strokeColor;
      this.canvasContext.shadowColor = 'red';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineWidth = this.strokeWidth;
    }
  }

  InitializeTrack() {
    this.getTrackEntry();
  }

  getTrackEntry() {
    this.track = {
      color: this.strokeColor,
      line: this.lineWidth,
      source_x: this.x_cordinate,
      source_y: this.y_cordinate,
      dest_x: 0,
      dest_y: 0,
    };
  }

  MouseUp(event: MouseEvent) {
    event.preventDefault();
    this.undo.push(this.track);
    this.mouseDown = false;
    this.track.dest_x = this.x_cordinate;
    this.track.dest_y = this.y_cordinate;
    this.undo.push(this.track);
    this.InitializeTrack();
  }

  onMouseMove(event: MouseEvent) {
    debugger
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
    this.getTrackEntry();
    this.track.source_x = this.x_cordinate;
    this.track.source_y = this.y_cordinate;
    this.mouseDown = true;
  }

  getCursorPositionOnPad(event: MouseEvent) {
    const rect = this.canvasObj.getBoundingClientRect();
    this.x_cordinate = event.x - rect.left;
    this.y_cordinate = event.y - rect.top < 0 ? 0 : event.y - rect.top;
  }

  saveImage() {
    this.isSaveInProcess = true;
    this.imgURL = this.canvasObj.toDataURL('image/png');

    const dialogRef = this.matdialog.open(ImageEditorComponent, {
      width: '50%',
      height: '60vh',
      data: {
        image: this.imgURL,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isSaveInProcess = false;
    });
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
  openSettings() {
    this.isSettingsOpen = true;
    const dialogRef = this.matdialog.open(DrawingsettingsComponent, {
      data: {
        color: this.strokeColor,
        strokeWidth: this.strokeWidth,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isSettingsOpen = false;
      this.strokeColor = result.color;
      this.strokeWidth = result.strokeWidth;
      this.initializeCanvasStyle();
    });
  }
}
