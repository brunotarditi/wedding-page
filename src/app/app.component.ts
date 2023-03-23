import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { interval, take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger( 'aniHeart', [
      state('inactive', style({
        color: '#FFF',
      })),
      state('active', style({
        color: 'red',
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('heart') heart: ElementRef;
  @ViewChild('arrowToDown') arrowToDown: ElementRef;
  @ViewChild('arrowToUp') arrowToUp: ElementRef;
  state: string = 'inactive';
  messageDays: string;
  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.listener();
    setInterval(this.missingDays, 3600000)
    this.missingDays();
  };

  over(){
    console.log('Entra')
    this.state = this.state === 'active' ? 'inactive' :'active';
  }

  listener(): void {
    this.renderer2.listen('window', 'scroll', () => {
      if (window.scrollY > 99) {
        this.renderer2.setStyle(this.heart?.nativeElement, 'display', 'none');
        this.renderer2.setStyle(this.arrowToDown?.nativeElement, 'display', 'none');
        this.renderer2.setStyle(this.arrowToUp.nativeElement, 'display', 'block');
      } else {
        this.renderer2.setStyle(this.heart?.nativeElement, 'display', 'block');
        this.renderer2.setStyle(this.arrowToDown?.nativeElement, 'display', 'block');
        this.renderer2.setStyle(this.arrowToUp.nativeElement, 'display', 'none');
      }
    })
  }

  missingDays(): void{
    const today = new Date();
    const weddingDate = new Date("2023-12-16");
    let msegDay = 1000 * 60 * 60 * 24;
    console.log(today.getTime())
    if(today.getMonth() == weddingDate.getMonth() && today.getDate() > weddingDate.getDate()){
      weddingDate.setFullYear(weddingDate.getFullYear() + 1)
    }
    let months = weddingDate.getMonth() - today.getMonth();
    let days = Math.ceil((weddingDate.getTime() - today.getTime()) / (msegDay));

    this.messageDays = `Faltan ${months} meses y ${days} días hasta el 16 de diciembre de 2023`;

    // let msegMinute = 1000 * 60;
    // let minute = Math.ceil((weddingDate.getTime() - today.getTime()) / msegMinute)
    // console.log("Minutos: " + minute)
  }

  ngOnDestroy(): void {
    this.listener();
  }

}
