import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddworkoutComponent } from './components/addworkout/addworkout.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', title: 'health_tracker/Home', component: HomeComponent },
  {
    path: 'add-workouts',
    title: 'health_tracker/Add Workouts',
    component: AddworkoutComponent,
  },
  {
    path: 'explore',
    title: 'health_tracker/Users',
    component: UsersListComponent,
  },
  { path: ':id', title: 'health_tracker/User', component: UserComponent },
];
