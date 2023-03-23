import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fade', [
      state('active', style({
        display: 'block',
      })),
      transition('inactive => active', [
        style({ opacity: 0, display: 'block' }),
        animate('500ms', style({ opacity: 1, display: 'block' }))
      ]),
      state('inactive', style({
        display: 'none',
      })),
      transition('active => inactive', [
        animate('200ms', style({ opacity: 0 }))
      ]),

    ]),
  ]
})
export class HeaderComponent implements OnInit {
  fade: string = 'inactive';

  listener: () => void;
  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.listener = this.renderer2.listen('window', 'scroll', () => {
      this.fade = window.scrollY > 100 ? 'active' : 'inactive';
    });
  }

  ngOnDestroy(): void {
    this.listener();
  }

}
