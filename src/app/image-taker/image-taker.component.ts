import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from "@angular/core";
@Component({
  selector: "app-image-taker",
  templateUrl: "./image-taker.component.html",
  styleUrls: ["./image-taker.component.css"]
})
export class ImageTakerComponent implements OnChanges {
  @Output("captured") captured = new EventEmitter<any>();
  @Output("close") close = new EventEmitter<any>();
  @Input() showImageTaker;
  private webcamImage = null;
  private Webcam = null;
  constructor() {
    if (window["Webcam"]) {
      this.Webcam = window["Webcam"];
    }
  }
  ngOnChanges() {
    this.webcamImage = null;
    setTimeout(() => {
      this.Webcam.set({
        width: 360,
        height: 360,
        dest_width: 360,
        dest_height: 360,
        image_format: "jpeg",
        jpeg_quality: 100,
        force_flash: false,
        flip_horiz: false,
        fps: 45
      });
      this.Webcam.attach("#my_camera");
    }, 700);
  }

  exit() {
    this.close.emit();
    this.showImageTaker = false;
    this.Webcam.reset();
  }
  capture() {
    try {
      this.Webcam.snap(data_uri => {
        this.webcamImage = data_uri;
      });
    } catch (e) {}
  }
  done() {
    // this.trigger.next();
    this.captured.emit({ data: this.webcamImage });
    this.showImageTaker = false;
    this.Webcam.reset();
  }
}
