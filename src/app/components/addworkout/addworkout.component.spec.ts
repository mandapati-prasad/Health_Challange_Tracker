import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkoutComponent } from './addworkout.component';

describe('AddworkoutComponent', () => {
  let component: AddworkoutComponent;
  let fixture: ComponentFixture<AddworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddworkoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddworkoutComponent);
    component = fixture.componentInstance;

    localStorage.setItem(
      'user_Data',
      JSON.stringify([
        { id: 1, name: 'John', workouts: [{ type: 'Yoga', minutes: 60 }] },
        {
          id: 2,
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

  it('should check the form has default values', () => {
    const form = component.workoutForm;
    expect(form.controls.name.value).toBe('');
    expect(form.controls.duration.value).toBe('');
    expect(form.controls.type.value).toBe('Select Workout');
  });

  it('should validate the form', () => {
    const form = component.workoutForm;
    expect(form.valid).toBeFalsy();

    form.controls.name.setValue('david');
    form.controls.duration.setValue('50');
    form.controls.type.setValue('Running');

    expect(form.valid).toBeTruthy();
    expect(component.msgBox.message).toBeFalsy();
    expect(component.msgBox.color).toBeFalsy();
  });

  it('should add the values to localStorage and show the message', () => {
    const form = component.workoutForm;
    expect(form.valid).toBeFalsy();
    expect(component.msgBox.message).toBe('');
    expect(component.msgBox.color).toBe(false);

    form.controls.name.setValue('david');
    form.controls.duration.setValue('50');
    form.controls.type.setValue('Running');

    component.onSubmit();

    let userData = JSON.parse(localStorage.getItem('user_Data') || '[]');
    let user = userData.find((user: any) => user.name === 'david');

    expect(user).toBeTruthy();
    expect(component.msgBox.message).toBe('User Added Successfully');
    expect(component.msgBox.color).toBeTruthy();
    expect(user.workouts.length).toBe(1);
    expect(userData.length).toBe(3);
    expect(user.id).toBe(3);
  });

  it('should update the workouts and show message Workout Added Successfully if user alredy existed', () => {
    const form = component.workoutForm;
    expect(form.valid).toBeFalsy();
    expect(component.msgBox.message).toBe('');
    expect(component.msgBox.color).toBe(false);

    form.controls.name.setValue('John');
    form.controls.duration.setValue('50');
    form.controls.type.setValue('Running');

    component.onSubmit();

    let userData = JSON.parse(localStorage.getItem('user_Data') || '[]');
    let user = userData.find((user: any) => user.name === 'John');

    expect(user).toBeTruthy();
    expect(component.msgBox.message).toBe('WorkOut Added Successfully');
    expect(component.msgBox.color).toBeTruthy();
    expect(user.workouts.length).toBe(2);
    expect(userData.length).toBe(2);
    expect(user.id).toBe(1);
  });

  it('should display please enter correct data on invalid submition', () => {
    expect(component.msgBox.message).toBe('');
    expect(component.msgBox.color).toBeFalsy();
    component.onSubmit();
    expect(component.msgBox.message).toBe('please enter correct data');
    expect(component.msgBox.color).toBeFalsy();
  });
});
