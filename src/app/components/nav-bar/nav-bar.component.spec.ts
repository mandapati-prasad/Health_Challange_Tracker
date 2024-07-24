import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navigation links', () => {
    const compile = fixture.nativeElement as HTMLElement;
    const links = compile.querySelectorAll('nav a');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Add Workouts');
    expect(links[2].textContent).toContain('Explore');
  });
});
