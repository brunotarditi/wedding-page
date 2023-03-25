import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { interval, Observable, Subscribable, Subscription, take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('aniHeart', [
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
  @ViewChild('circleS') circleS: ElementRef;
  @ViewChild('circleM') circleM: ElementRef;
  @ViewChild('circleH') circleH: ElementRef;
  @ViewChild('circleD') circleD: ElementRef;
  state: string = 'inactive';
  days: number;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  subscription: Subscription;
  constructor(private renderer2: Renderer2) {
    this.days = 0;
  }

  ngOnInit(): void {
    this.listener();
    const source = interval(1000);
    this.subscription = source.subscribe(() => this.getTimeRemaining())

  };

  over() {
    console.log('Entra')
    this.state = this.state === 'active' ? 'inactive' : 'active';
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

  getTimeRemaining(): void{
    let todayToMs = Date.parse(new Date('2023-12-15T20:00:00').toString()) + 1 * 24 * 60 * 60 * 1000
    let today = new Date(todayToMs);
    let now = Date.parse(new Date().toString())
    let time = today.getTime() - now;

    if (time <= 0){
      this.subscription.unsubscribe();
    }
    this.seconds = Math.floor((time / 1000) % 60);
    this.minutes = Math.floor((time / 1000 / 60) % 60);
    this.hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    this.days = Math.floor(time / (1000 * 60 * 60 * 24));

    let days = (100 / 265) * 3.6;

    this.renderer2.setStyle(this.circleS?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.seconds * 6}deg, #eded 0deg)`)
    this.renderer2.setStyle(this.circleM?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.minutes * 6}deg, #eded 0deg)`)
    this.renderer2.setStyle(this.circleH?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.hours * 15}deg, #eded 0deg)`)
    this.renderer2.setStyle(this.circleD?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.days * days}deg, #eded 0deg)`)
  }


  ngOnDestroy(): void {
    this.listener();
  }

}
