import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images: string[] = [];

  constructor() {

   }

  ngOnInit(): void {
    this.images = [
      "./../../../assets/img/carousel1.jpg",
      "./../../../assets/img/carousel2.jpg",
      "./../../../assets/img/carousel3.jpg"]
  }

}
