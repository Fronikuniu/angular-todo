import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TODO LIST';
  copyright = `${new Date().getFullYear()} © TODO List build with Angular.`;
}
