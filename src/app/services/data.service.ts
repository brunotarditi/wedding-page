import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  active$ = new EventEmitter<boolean>();


  constructor() { }
}
