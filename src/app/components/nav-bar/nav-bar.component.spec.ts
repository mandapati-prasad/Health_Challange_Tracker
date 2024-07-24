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

  it('should render logo', () => {
    const logo = fixture.nativeElement.querySelector('.logo img[alt="logo"]');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('logo.png');
  });

  it('should render the navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Add Workouts');
    expect(links[2].textContent).toContain('Explore');
  });

  it('should navigate to Home by clicking on HomeTab', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const homeLink = fixture.nativeElement.querySelector(
      'nav a[routerLink="/"]'
    );
    homeLink.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(
      jasmine.stringMatching('/'),
      jasmine.objectContaining({
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      })
    );
  });

  it('should navigate to AddWorkouts by Clicking on Add Workouts tab', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const AddLink = fixture.nativeElement.querySelector(
      'nav a[routerLink="/add-workouts"]'
    );

    AddLink.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(
      jasmine.stringMatching('/add-workouts'),
      jasmine.objectContaining({
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      })
    );
  });

  it('should navigate to Explore page by Clicking on Explore tab', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const ExploreLink = fixture.nativeElement.querySelector(
      'nav a[routerLink="/explore"]'
    );

    ExploreLink.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(
      jasmine.stringMatching('/explore'),
      jasmine.objectContaining({
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
        info: undefined,
      })
    );
  });
});
