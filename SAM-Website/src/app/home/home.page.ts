import { Component } from '@angular/core';
import { initHome } from './home-scripts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() { }

  ngAfterViewInit() {
    initHome();
  }

}
