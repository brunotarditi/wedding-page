import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
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
  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.listener();
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

  ngOnDestroy(): void {
    this.listener();
  }

}
