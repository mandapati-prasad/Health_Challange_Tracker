import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

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
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  id: number = 0;
  user: User | null = null;
  public chart: any;

  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // this.id = +this.router.snapshot.params['id'];
    this.id = +this.router.url.split('/')[1];
    let userData = JSON.parse(localStorage.getItem('user_Data') || '[]');
    this.user =
      userData.find((user: { id: number }) => user.id === this.id) || null;
    this.createChart();
  }

  createChart() {
    console.log(this.user?.workouts.map((u) => u.minutes));
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.user?.workouts.map((u) => u.type),
        datasets: [
          {
            label: 'Workout Time In Minutes',
            data: this.user?.workouts.map((u) => u.minutes),
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        // aspectRatio: 1.5,
        responsive: true,
        maintainAspectRatio: false,
        color: 'white',
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              font: {
                size:15
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: 'white',
            },
          },
          x: {
            ticks: {
              color: 'white',
            },
          },
        },
      },
    });
  }

  getTotlaMinutes() {
    let count: number = 0;
    this.user?.workouts.map((item: Workouts) => (count += item.minutes));
    return count;
  }

  getWorkouts() {
    return this.user?.workouts
      .map((item: Workouts) => item.type)
      .slice(0)
      .join(',');
  }
}
