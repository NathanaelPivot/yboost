import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailFormComponent } from './cocktail-form.component';

describe('CocktailFormComponent', () => {
  let component: CocktailFormComponent;
  let fixture: ComponentFixture<CocktailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CocktailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
