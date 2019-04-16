import { Component, OnInit } from '@angular/core';
import '../assets/login-animation.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Shopping Website';
  user: string = null;

  ngOnInit(): void {
    this.user = 'Raghavan';
  }
}
