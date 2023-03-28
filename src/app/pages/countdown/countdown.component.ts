import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  @ViewChild('circleSeconds') circleSeconds: ElementRef;
  @ViewChild('circleMinutes') circleMinutes: ElementRef;
  @ViewChild('circleHours') circleHours: ElementRef;
  @ViewChild('circleDays') circleDays: ElementRef;
  days: number = 0;
  hours: any = 0;
  minutes: any = 0;
  seconds: any = 0;
  subscription: Subscription;
  source: Observable<number>;

  constructor(private renderer2: Renderer2) { }


  ngOnInit(): void {
    this.source = interval(1000);
    this.subscription = this.source.pipe(
      map(() => this.getTimeRemaining())
      ).subscribe();
  }

  getTimeRemaining(): void {
    let todayToMs = Date.parse(new Date('2023-12-15T20:00:00').toString()) + 1 * 24 * 60 * 60 * 1000
    let today = new Date(todayToMs);
    let now = Date.parse(new Date().toString())
    let time = today.getTime() - now;

    if (time <= 0) {
      this.subscription.unsubscribe();
    }
    this.seconds = Math.floor((time / 1000) % 60);
    this.minutes = Math.floor((time / 1000 / 60) % 60);
    this.hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    this.days = Math.floor(time / (1000 * 60 * 60 * 24));

    this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    this.hours = this.hours < 10 ? `0${this.hours}` : this.hours;


    let days = (100 / 365) * 3.6;
    this.renderer2.setStyle(this.circleSeconds?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.seconds * 6}deg, #eded 0deg)`)
    this.renderer2.setStyle(this.circleMinutes?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.minutes * 6}deg, #eded 0deg)`)
    this.renderer2.setStyle(this.circleHours?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.hours * 15}deg, #eded 0deg)`)
    this.renderer2.setStyle(this.circleDays?.nativeElement, 'background', `conic-gradient(#DF2E39 ${this.days * days}deg, #eded 0deg)`)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
