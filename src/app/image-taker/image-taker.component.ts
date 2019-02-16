import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
@Component({
  selector: 'app-image-taker',
  templateUrl: './image-taker.component.html',
  styleUrls: ['./image-taker.component.css']
})
export class ImageTakerComponent implements OnChanges{
  @Output('captured') captured = new EventEmitter<any>();
  @Output('close') close = new EventEmitter<any>();
  @Input() showImageTaker;
  
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  
  ngOnChanges(){
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
      this.webcamImage = null;
      this.trigger.next(null);
      this.showWebcam = true;
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  exit(){
    this.close.emit();
    this.showWebcam = false;
  }
  done(){
    // this.trigger.next();
    this.captured.emit({ data: this.webcamImage.imageAsDataUrl});
    this.showWebcam = false;
  }
  
}
