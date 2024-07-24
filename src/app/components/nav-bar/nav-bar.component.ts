import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  links = [
    { icon: 'ri-home-2-line', link: '/', text: 'Home' },
    { icon: 'ri-add-circle-line', link: 'add-workouts', text: 'Add Workouts' },
    { icon: 'ri-compass-line', link: 'explore', text: 'Explore' },
  ];

  toggle = true;
  changeToggle() {
    this.toggle = !this.toggle;
  }

  setToggle() {
    console.log(window.innerWidth);
    if (window.innerWidth < 768) {
      this.toggle = !this.toggle;
    }
  }
}
