import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Navbar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {

}
