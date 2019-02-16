import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data= [];
  showImageTaker = false;
  temp = {};
  constructor(){
    this.data = [
      {name: 'Abhinav', age: 12, image:null},
      {name: 'Aman', age: 10, image:null},
      {name: 'Baba', age: 25, image:null},
      {name: 'Bhatt', age: 26, image:null},
      {name: 'Ravi', age: 26, image:null},
      {name: 'Rakesh', age: 26, image:null},
    ];
  }

  openImagePopUp(item){
    this.temp = item;
    this.showImageTaker = true;
  }
  closePopUp(){
    this.showImageTaker = false;
  }
  imageCaptured(a){
    this.showImageTaker = false;
    this.temp['image'] = a.data;
    this.closePopUp();
  }
}
