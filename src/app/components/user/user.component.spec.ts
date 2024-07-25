import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { UserComponent } from './user.component';
import { ActivatedRoute } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject({ id: '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    localStorage.setItem(
      'user_Data',
      JSON.stringify([
        {
          id: 1,
          name: 'John',
          workouts: [
            { type: 'Gym', minutes: 60 },
            { type: 'Running', minutes: 40 },
          ],
        },
        { id: 2, name: 'Edward', workouts: [{ type: 'Gym', minutes: 50 }] },
        {
          id: 3,
          name: 'Jane Smith',
          workouts: [{ type: 'Running', minutes: 30 }],
        },
      ])
    );

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('user_Data');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user based on id from the params', () => {
    const userData = JSON.parse(localStorage.getItem('user_Data') || '[]');
    expect(component.userId).toBe(1);
    const user = userData.find((u: any) => u.id === component.userId);
    expect(component.user).toEqual(user);
  });

  it('should get total no of minutes', () => {
    const total_min = component.getTotlaMinutes();
    expect(total_min).toBe(100);
  });

  it('should get workouts separated by comma(,)', () => {
    const total_workouts = component.getWorkouts();
    expect(total_workouts).toBe('Gym,Running');
    expect(component.user?.workouts.length).toBe(2);
  });

  it('should render chart', () => {
    expect(component.chart).toBeTruthy();
  });
});
