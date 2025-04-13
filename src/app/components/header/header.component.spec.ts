import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers:[provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /players when navigateTo is called with "players"', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateTo('players');
    expect(navigateSpy).toHaveBeenCalledWith(['players']);
  });

  it('should navigate to /map when navigateTo is called with "map"', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateTo('map');
    expect(navigateSpy).toHaveBeenCalledWith(['map']);
  });

  it('should navigate to /calendar when navigateTo is called with "calendar"', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateTo('calendar');
    expect(navigateSpy).toHaveBeenCalledWith(['calendar']);
  });

  it('should navigate to /graphs when navigateTo is called with "graphs"', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateTo('graphs');
    expect(navigateSpy).toHaveBeenCalledWith(['graphs']);
  });
});
