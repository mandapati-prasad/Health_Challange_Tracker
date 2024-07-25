import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;

    localStorage.setItem(
      'user_Data',
      JSON.stringify([
        { id: 1, name: 'John', workouts: [{ type: 'Gym', minutes: 60 }] },
        { id: 1, name: 'Edward', workouts: [{ type: 'Gym', minutes: 50 }] },
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

  it('should get user Details', () => {
    expect(component.filteredData).toBeTruthy();
    expect(component.filteredData?.length).toBe(3);
    expect(component.filteredData[0].name).toBe('John');
  });

  it('should check whether form has default values', () => {
    const form = component.filterForm;
    expect(form.value.name).toBe('');
    expect(form.value.type).toBe('All');
    expect(form.value.pages).toBe('5');
  });

  it('should get All users by default type All', () => {
    expect(component.filterForm.value.type).toBe('All');
    expect(component.filteredData.length).toBe(3);
    expect(component.filteredData).toEqual([
      { id: 1, name: 'John', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 1, name: 'Edward', workouts: [{ type: 'Gym', minutes: 50 }] },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [{ type: 'Running', minutes: 30 }],
      },
    ]);
  });

  it('should filter data by name', () => {
    const form = component.filterForm;
    form.controls.name.setValue('John');
    component.filterByName();
    expect(component.filteredData).toEqual([
      { id: 1, name: 'John', workouts: [{ type: 'Gym', minutes: 60 }] },
    ]);
  });

  it('should filter data by type', () => {
    const form = component.filterForm;
    form.controls.type.setValue('Gym');
    component.filterByType();
    expect(component.filteredData).toEqual([
      { id: 1, name: 'John', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 1, name: 'Edward', workouts: [{ type: 'Gym', minutes: 50 }] },
    ]);
  });

  it('should paginate according to items per page', () => {
    const form = component.filterForm;
    let compile = fixture.nativeElement as HTMLElement;
    form.controls.pages.setValue('1');
    component.setPages();
    expect(component.perPage).toBe(1);
    expect(component.totalpages).toBe(3);
  });
});
