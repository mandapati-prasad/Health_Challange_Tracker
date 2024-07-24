import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface Workouts {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workouts[];
}

interface alertBox {
  message: string;
  color: boolean;
}

@Component({
  selector: 'app-addworkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addworkout.component.html',
  styleUrl: './addworkout.component.css',
})
export class AddworkoutComponent {
  workoutForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    type: new FormControl('Select Workout', [Validators.required]),
  });

  msgBox: alertBox = {
    message: '',
    color: false,
  };

  box = (msg: string, c: boolean = false) => {
    this.msgBox = { message: msg, color: c };
    setTimeout(() => {
      this.msgBox = { message: '', color: false };
    }, 3000);
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.workoutForm.valid) {
      this.box('please enter correct data');
      return;
    }

    const { name, duration, type } = this.workoutForm.value;
    const data = localStorage.getItem('user_Data');
    let userData = data ? JSON.parse(data) : [];
    let user: User | null = userData.find((u: any) => u.name === name);

    if (!user) {
      user = {
        id: userData.length + 1,
        name: name || '',
        workouts: [{ type: type || '', minutes: +String(duration) || 0 }],
      };
      userData.push(user);
      this.box('User Added Successfully', true);
    } else {
      user.workouts.push({
        type: type || '',
        minutes: +String(duration) || 0,
      });
      this.box('WorkOut Added Successfully', true);
    }

    localStorage.setItem('user_Data', JSON.stringify(userData));
  }
}
