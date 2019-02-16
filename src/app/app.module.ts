import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import { AppComponent } from './app.component';
import { ImageTakerComponent } from './image-taker/image-taker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from 'ngx-webcam';
@NgModule({
  declarations: [
    AppComponent,
    ImageTakerComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
