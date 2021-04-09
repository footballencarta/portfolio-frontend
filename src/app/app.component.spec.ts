import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  let router: Router;
  let fixture: any;
  let app: AppComponent;

  it('should toggle menu', () => {
    expect(app.showMenu).toBeFalsy();

    app.toggleMenu();

    expect(app.showMenu).toBeTruthy();
  });

  it('should hide on route change', async () => {
    router = TestBed.inject(Router);

    app.showMenu = true;

    expect(app.showMenu).toBeTruthy();

    await router.navigateByUrl('/');

    expect(app.showMenu).toBeFalsy();
  });

  it('should hide on click outside', () => {
    app.showMenu = true;

    expect(app.showMenu).toBeTruthy();

    app.onClickedOutside(new MouseEvent('click'));

    expect(app.showMenu).toBeFalsy();

    app.onClickedOutside(new MouseEvent('click'));

    expect(app.showMenu).toBeFalsy();
  });
});
