import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

interface Workouts {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workouts[];
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  filterForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('All'),
    pages: new FormControl('5'),
  });

  filteredData: User[] = [];

  page = 1;
  perPage = 5;
  totalpages = 0;

  ngOnInit() {
    this.filteredData = JSON.parse(localStorage.getItem('user_Data') || '[]');
    this.totalpages = Math.ceil(this.filteredData.length / this.perPage);
  }

  getWorkouts(workouts: Workouts[]) {
    let types = workouts.map((item: Workouts) => item.type);
    return types.slice(0).join(',');
  }

  getMinutes(workouts: Workouts[]) {
    let count: number = 0;
    workouts.map((item: Workouts) => (count += item.minutes));
    return count;
  }

  filterByName() {
    this.page = 1;
    const userData = JSON.parse(localStorage.getItem('user_Data') || '[]');
    if (this.filterForm.value.name !== '') {
      return (this.filteredData = userData.filter((user: User) =>
        user.name
          .toLowerCase()
          .includes(String(this.filterForm.value.name)?.toLowerCase())
      ));
    }

    if (this.filterForm.value.type === 'All') {
      return (this.filteredData = userData);
    }

    if (this.filterForm.value.type) {
      this.filterByType();
    }
  }

  filterByType() {
    this.page = 1;
    const userData = JSON.parse(localStorage.getItem('user_Data') || '[]');

    if (this.filterForm.value.type === 'All') {
      return (this.filteredData = userData);
    }

    if (this.filterForm.value.type) {
      this.filterForm.value.name = '';
      return (this.filteredData = userData.filter((user: any) =>
        this.getUser(user, this.filterForm.value.type)
      ));
    }
  }

  getUser(user: User, type: any) {
    const count = user.workouts.filter((item: any) => item.type === type);
    return count.length > 0;
  }

  setPages() {
    this.page = 1;
    this.perPage = +String(this.filterForm.value.pages);
    this.totalpages = Math.ceil(this.filteredData.length / this.perPage);
  }
}
